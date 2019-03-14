import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router'
import './App.css';
import NavBar from './containers/NavBar'
import Home from './containers/Home'
import NewSupperForm from './containers/NewSupperForm'
import BecomeHostContainer from './containers/BecomeHostContainer'


class App extends Component {

  state = {
    currentUser: "",
  }

  render() {
    return (
      <div className="SUPPERCLUB">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/new-supper" render={(props) => <NewSupperForm /> } />
            <Route exact path="/become-a-host" render={(props) => <BecomeHostContainer /> } />
          </Switch>
      </div>
    );
  }
}

export default App;
