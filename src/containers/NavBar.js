import React from 'react';
// import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import Popup from 'reactjs-popup'
import LogInPopUp from '../components/LogInPopUp'
import SignUpPopUp from '../components/SignUpPopUp'


const NavBar = () => {
  return (
    <ul>
      <li>
        <h1 className="logo">SUPPERCLUB</h1>
      </li>
      <li className="NavBarLink">BECOME A HOST</li>
      <Popup
        trigger={<button className="NavBarLink"> SIGN UP </button>}
        modal
      >
        {close => (
          <div className="modal">
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="content">
              <SignUpPopUp />
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
            <a className="close" onClick={close}>
              &times;
            </a>
            <div className="content">
              <LogInPopUp />
            </div>
          </div>
        )}
      </Popup>
    </ul>
  )
}

export default NavBar
