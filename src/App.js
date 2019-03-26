// /* global google */
import React, { Component } from 'react';
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
import Profile from './containers/Profile'
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
    attendingSuppers: [],
    suppers: [],
    filteredSuppers: [],
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
    this.getAllSuppers()
    this.getHostedSuppers()
    this.getAttendedSuppers()

  }

  getHostedSuppers = () => {
    API.getHostedSuppers(this.state.currentUser)
      .then(suppers => this.setState({hostedSuppers: suppers}))
  }

  getAttendedSuppers = () => {
    API.getAttendedSuppers(this.state.currentUser)
      .then(suppers => this.setState({attendingSuppers: suppers}))
  }

  getAllSuppers = () => {
    API.getAllSuppers()
      .then(suppers => {
        this.setState({suppers})
        const newSuppers = suppers.slice(-3)
        this.setState({exploreSuppers: newSuppers})
      })
  }


  filteredSuppers = () => {
    this.state.suppers.forEach(supper => {

      const supperLatLng = {lat: supper.lat, lng: supper.lng}
      const givenLatLng = {lat: this.state.givenLocation.lat, lng: this.state.givenLocation.lng}

      let R = 3959; // miles
    	let dLat = (this.state.givenLocation.lat-supper.lat) * Math.PI / 180;
    	let dLon = (this.state.givenLocation.lng-supper.lng) * Math.PI / 180;
    	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    		Math.cos(supper.lat * Math.PI / 180 ) * Math.cos(this.state.givenLocation.lat * Math.PI / 180 ) *
    		Math.sin(dLon/2) * Math.sin(dLon/2);
    	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    	let d = R * c;
    	console.log(d)
      if (d <= 12 && !(
          this.state.attendingSuppers.find((asupper) => {
              return asupper.id === supper.id
          }))
          && !(
            this.state.hostedSuppers.find((asupper) => {
              return asupper.id === supper.id
            })
          )
         ) {

        this.setState({filteredSuppers: [...this.state.filteredSuppers, supper]})
      }
    })
  }

  handleSelect = address => {
    this.setState({
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
        this.filteredSuppers()
      })
      .catch(error => console.error('Error', error));

  };

  handleAddressChange = address => {
    this.setState({ address });
  };

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.logOut()
      } else {
        this.logIn(userData)
      }
    })
  }

  render() {
    return (
      <div className="SUPPERCLUB">
          <NavBar currentUser={this.state.currentUser} logIn={this.logIn} logOut={this.logOut} loggedIn={this.state.loggedIn}/>
          <Switch>
            <Route exact path="/signup" render={(props) =>
              <LogInSignUpHome />
            } />
            <Route exact path="/" render={(props) =>
              <Home
              address={this.state.address}
              givenLocation={this.state.givenLocation}
              filteredSuppers={this.filteredSuppers}
              handleSelect={this.handleSelect}
              handleAddressChange={this.handleAddressChange}
              filteredSuppers={this.state.filteredSuppers}
              handleAttendClick={this.handleAttendClick}
              currentUser={this.state.currentUser}
              getAttendedSuppers={this.getAttendedSuppers}
              exploreSuppers={this.state.exploreSuppers}
              {...props} />}/>
            <Route exact path="/new-supper" render={(props) =>
              <NewSupperForm
              handleSubmit={this.handleNewSupperSubmit}
              handleSelect={this.handleSelect}
              createSupper={this.createSupper}
              currentUser={this.state.currentUser} /> } />
            <Route exact path="/profile" render={(props) =>
              <Profile
              currentUser={this.state.currentUser} /> } />
            <Route exact path="/hosted-suppers" render={(props) =>
              <HostedSuppers
              currentUser={this.state.currentUser}
              hostedSuppers={this.state.hostedSuppers}/> } />
            <Route exact path="/attending-suppers" render={(props) =>
              <AttendingSuppers
              currentUser={this.state.currentUser}
              attendingSuppers={this.state.attendingSuppers}/> } />
          </Switch>
      </div>
    );
  }
}

export default App;
