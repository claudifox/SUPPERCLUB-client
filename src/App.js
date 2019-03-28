// /* global google */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
  Route,
  Switch,
} from 'react-router'
import './App.css';
import NavBar from './containers/NavBar'
import Home from './containers/Home'
import LogInSignUpHome from './containers/LogInSignUpHome'
import NewSupperForm from './containers/NewSupperForm'
import API from './API.js';
import ProfileSideBar from './components/ProfileSideBar'
import Suppers from './containers/Suppers'
import HostedSuppers from './containers/HostedSuppers'
import AttendingSuppers from './containers/AttendingSuppers'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class App extends Component {

  state = {
    currentUser: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      profilePicture: "",
      description: "",
      userId: "",
    },
    loggedIn: false,
    hostedSuppers: [],
    pastHostedSuppers: [],
    futureHostingSuppers: [],
    attendingSuppers: [],
    pastAttendedSuppers: [],
    futureAttendingSuppers: [],
    suppers: [],
    filteredSuppers: [],
    newSuppers: [],
    exploreSuppers: [],
    address: "",
    givenLocation: {
      lat: 0.0,
      lng: 0.0,
      selectedAddress: "",
    }
  }

  logIn = user => {
    localStorage.setItem("token", user.token)
    this.setState({
      loggedIn: true
    })
    this.getUserInfo(user)
    this.props.history.push('/search')
  }

  logOut = user => {
    localStorage.removeItem("token")
    this.setState({
      currentUser: {
        firstName: "",
        lastName: "",
        emailAddress: "",
        profilePicture: "",
        description: "",
        userId: "",
      },
      loggedIn: false,
    })
  }

  getUserInfo = user => {
    this.setState({
      currentUser: {
      firstName: user.first_name,
      lastName: user.last_name,
      emailAddress: user.email_address,
      profilePicture: user.profile_picture,
      description: user.description,
      userId: user.user_id
    },
    })
    this.getHostedSuppers()
    this.getAttendedSuppers()
    this.getAllSuppers()


  }

  getHostedSuppers = () => {
    API.getHostedSuppers(this.state.currentUser)
      .then(suppers => {
        this.setState({hostedSuppers: suppers})
        suppers.forEach(supper => {
          let dateToday = new Date()
          let supperDate = new Date(supper.date)
          if (supperDate >= dateToday) {
            this.setState({futureHostingSuppers: [...this.state.futureHostingSuppers, supper]})
          } else {
            this.setState({pastHostedSuppers: [...this.state.pastHostedSuppers, supper]})
          }
        })
      })
  }

  getAttendedSuppers = () => {
    API.getAttendedSuppers(this.state.currentUser)
      .then(suppers => {
        this.setState({attendingSuppers: suppers})
        suppers.forEach(supper => {
          let dateToday = new Date()
          let supperDate = new Date(supper.date)
          if (supperDate >= dateToday) {
            this.setState({futureAttendingSuppers: [...this.state.futureAttendingSuppers, supper]})
          } else {
            this.setState({pastAttendedSuppers: [...this.state.pastAttendedSuppers, supper]})
          }
        })
      })
  }

  getAllSuppers = () => {
    API.getAllSuppers()
      .then(suppers => {
        this.setState({suppers})
        // debugger
        suppers.forEach(supper => {
          // debugger
          if(!(this.state.attendingSuppers.find((asupper) => {
            return asupper.id === supper.id
          })) &&
        !(this.state.hostedSuppers.find((asupper) => {
          return asupper.id === supper.id
        }))) {
          this.setState({newSuppers: [...this.state.newSuppers, supper]})
        }
        let exploreSuppers = this.state.newSuppers.slice(-4)
        this.setState({exploreSuppers})
      })
  })
}


  filteredSuppers = () => {
    const filteredSuppers = []
    this.state.suppers.forEach(supper => {
      // const supperLatLng = {lat: supper.lat, lng: supper.lng}
      // const givenLatLng = {lat: this.state.givenLocation.lat, lng: this.state.givenLocation.lng}
      let R = 3959; // miles
    	let dLat = (this.state.givenLocation.lat-supper.lat) * Math.PI / 180;
    	let dLon = (this.state.givenLocation.lng-supper.lng) * Math.PI / 180;
    	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(supper.lat * Math.PI / 180 ) * Math.cos(this.state.givenLocation.lat * Math.PI / 180 ) *
    		Math.sin(dLon/2) * Math.sin(dLon/2);
    	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	let d = R * c;
    	console.log(d)
      if (d <= 5 && !(
          this.state.attendingSuppers.find((asupper) => {
              return asupper.id === supper.id
          }))
          && !(
            this.state.hostedSuppers.find((asupper) => {
              return asupper.id === supper.id
            })
          )
         ) {
           return this.state.filteredSuppers.includes(supper) ? null : filteredSuppers.push(supper)
      }
    })
    this.setState({filteredSuppers})
  }

  handleSubmit = event => {
    event.preventDefault()
    this.filteredSuppers()
  }

  handleSelect = address => {
    this.setState({
      address: address,
      givenLocation: {
        ...this.state.givenLocation,
        selectedAddress: address
      }
    });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          givenLocation: {
            ...this.state.givenLocation,
            lat: latLng.lat,
            lng: latLng.lng
        }
        })
        console.log('Success', latLng)
      })
      .catch(error => console.error('Error', error));
  };

  handleAddressChange = address => {
    this.setState({
      address: address,
      filteredSuppers: [],
     });
  };

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.logOut()
      } else {
        this.logIn(userData)
        this.props.history.push('/search')
      }
    })
  }

  render() {
    return (
      <div className="SUPPERCLUB">
          <NavBar
            currentUser={this.state.currentUser}
            logIn={this.logIn}
            logOut={this.logOut}
            loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/" render={(props) =>
              <LogInSignUpHome />
            } />
            <Route exact path="/search" render={(props) =>
              <Home
                address={this.state.address}
                givenLocation={this.state.givenLocation}
                filteredSuppers={this.filteredSuppers}
                handleSelect={this.handleSelect}
                handleSubmit={this.handleSubmit}
                handleAddressChange={this.handleAddressChange}
                filteredSuppers={this.state.filteredSuppers}
                handleAttendClick={this.handleAttendClick}
                currentUser={this.state.currentUser}
                getAttendedSuppers={this.getAttendedSuppers}
                exploreSuppers={this.state.exploreSuppers}
                attendingSuppers={this.state.attendedSuppers}
                history={this.props.history}
                {...props} />}/>
            <Route exact path="/new-supper" render={(props) =>
              <NewSupperForm
                handleSelect={this.handleSelect}
                createSupper={this.createSupper}
                currentUser={this.state.currentUser} /> } />
            <Route exact path="/profile" render={(props) =>
              <ProfileSideBar
                currentUser={this.state.currentUser}
                history={this.props.history}
                getUserInfo={this.getUserInfo}
                /> } />
            <Route exact path="/hosted-suppers" render={(props) =>
              <HostedSuppers
                currentUser={this.state.currentUser}
                hostedSuppers={this.state.hostedSuppers}
                pastHostedSuppers={this.state.pastHostedSuppers}
                futureHostingSuppers={this.state.futureHostingSuppers}/> } />
            <Route exact path="/attending-suppers" render={(props) =>
              <AttendingSuppers
                currentUser={this.state.currentUser}
                attendingSuppers={this.state.attendingSuppers}
                pastAttendedSuppers={this.state.pastAttendedSuppers}
                futureAttendingSuppers={this.state.futureAttendingSuppers}/> } />
            <Route exact path="/suppers" render={(props) =>
              <Suppers
                pastHostedSuppers={this.state.pastHostedSuppers}
                futureHostingSuppers={this.state.futureHostingSuppers}
                pastAttendedSuppers={this.state.pastAttendedSuppers}
                futureAttendingSuppers={this.state.futureAttendingSuppers}
              />
            } />
          </Switch>
      </div>
    );
  }
}

export default withRouter(App);
