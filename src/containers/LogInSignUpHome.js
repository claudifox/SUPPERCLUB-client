import React, { Component } from 'react';
// import '../css/Home.css';
import HeroImage from '../images/HeroImage.jpg'


export default class LogInSignUpHome extends Component {

  render() {
    return (
      <img src={HeroImage} style={{
        width: '100%',
        height: 'inherit',
      backgroundSize: 'cover',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: '1 1 auto'}}/>
    )
  }
}
