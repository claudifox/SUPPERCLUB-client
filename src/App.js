import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router'
import './App.css';
import NavBar from './containers/NavBar'
import Home from './containers/Home'
import NewSupperForm from './containers/NewSupperForm'
import API from './API.js';
import Profile from './containers/Profile'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';





class App extends Component {

  state = {
    currentUser: {},
  }


  logIn = user => {
    localStorage.setItem("token", user.token)
  }

  logOut = user => {
    localStorage.removeItem("token")
    this.setState({currentUser: {}})
  }

  getUserInfo = user => {
    this.setState({
      currentUser: {
      firstName: user.first_name,
      lastName: user.last_name,
      emailAddress: user.email_address,
      profilePicture: user.profile_picture,
      description: user.description,
    }})
  }

  componentDidMount() {
    API.validate().then(userData => {
      if (userData.error) {
        this.logOut()
      } else {
        this.logIn(userData)
        this.getUserInfo(userData)
      }
    })
  }




  render() {
    return (
      <div className="SUPPERCLUB">
          <NavBar currentUser={this.state.currentUser} logIn={this.logIn} logOut={this.logOut}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-supper" render={(props) => <NewSupperForm /> } />
            <Route exact path="/profile" render={(props) => <Profile currentUser={this.state.currentUser}/> } />

          </Switch>
      </div>
    );
  }
}

export default App;
