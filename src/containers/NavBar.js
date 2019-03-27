import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import Popup from 'reactjs-popup'
import LogInPopUp from '../components/LogInPopUp'
import SignUpPopUp from '../components/SignUpPopUp'


export default class NavBar extends Component {


  handleChange = event => {
  this.setState({[event.target.name]: event.target.value})
}

  render() {
    return (
        <ul className="NavBar">
          <li>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1 className="logo"  >SUPPERCLUB</h1>
            </Link>
          </li>
          {this.props.loggedIn ?
            <ul>
              <li>
              <Link to="/search" style={{ textDecoration: 'none' }}>
              <button className="NavBarLink"  >FIND A SUPPER</button>
              </Link>
              </li>
              <li>
              <Link to="/new-supper" style={{ textDecoration: 'none' }}>
              <button className="NavBarLink"  >HOST A SUPPER</button>
              </Link>
              </li>
              <li>
              <Link to="/suppers">
              <button className="NavBarLink">SUPPERS</button>
              </Link>
              </li>
              <li>
              <Link to="/profile" style={{ textDecoration: 'none' }}>
              <button className="NavBarLink"  >MY PROFILE</button>
              </Link>
              </li>
              <li>
              <Link to="/" style={{ textDecoration: 'none' }} onClick={this.props.logOut}>
              <button className="NavBarLink"  >LOG OUT</button>
              </Link>
              </li>
            </ul>
            :
            <div>
              <Popup
                trigger={<button className="NavBarLink"> SIGN UP </button>}
                modal
                >
                {close => (
                  <div className="modal">
                  <button className="close" onClick={close}>
                  &times;
                  </button>
                  <div className="content">
                  <SignUpPopUp logIn={this.props.logIn} handleChange={this.handleChange} />
                  </div>
                  </div>
                )}
                </Popup>
              <Popup
                trigger={<button className="NavBarLink"> LOG IN </button>}
                modal
                >
                {close => (
                  <div className="modal">
                  <button className="close" onClick={close}>
                  &times;
                  </button>
                  <div className="content">
                  <LogInPopUp logIn={this.props.logIn} handleChange={this.handleChange} loggedIn={this.props.loggedIn} />
                  </div>
                  </div>
                )}
                </Popup>
              </div>
          }
        </ul>

    )
  }
}
