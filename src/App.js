import React, { Component } from 'react';
import {
  Route,
  Switch,
} from 'react-router'
import './App.css';
import NavBar from './containers/NavBar'
import Home from './containers/Home'
import CreateSupperForm from './containers/CreateSupperForm'


class App extends Component {

  state = {
    showPopUp: false,
  }

  render() {
    return (
      <div className="SUPPERCLUB">
          <NavBar showPopUp={this.state.showPopUp}/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/create-supper" render={(props) => <CreateSupperForm /> } />
          </Switch>
      </div>
    );
  }
}

export default App;
