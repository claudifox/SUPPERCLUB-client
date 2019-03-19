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
import Suppers from './containers/Suppers'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';





class App extends Component {

  state = {
    currentUser: {},
    loggedIn: false,
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
      currentUser: {},
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
  }

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
            <Route exact path="/" component={Home} />
            <Route exact path="/new-supper" render={(props) => <NewSupperForm handleSubmit={this.handleNewSupperSubmit} handleSelect={this.handleSelect} createSupper={this.createSupper} currentUser={this.state.currentUser} /> } />
            <Route exact path="/profile" render={(props) => <Profile currentUser={this.state.currentUser}/> } />
            <Route exact path="/suppers" render={(props) => <Suppers currentUser={this.state.currentUser}/> } />

          </Switch>
      </div>
    );
  }
}

export default App;
