import React from 'react';
// import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import Popup from 'reactjs-popup'

const NavBar = () => {
  return (
    <ul>
      <li>
        <h1 className="logo">SUPPERCLUB</h1>
      </li>
      <li className="NavBarLink">BECOME A HOST</li>
      <li className="NavBarLink">SIGN UP</li>
      <li className="NavBarLink" >LOG IN</li>
    </ul>
  )
}

export default NavBar
