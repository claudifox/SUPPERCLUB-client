import React, { Component } from 'react';
// import '../css/Home.css';
import HeroImage from './HeroImage.jpg'


export default class LogInSignUpHome extends Component {

  render() {
    return (
      <div className="hero-image" >
        <div className="hero-text">
          <h1>Welcome to SUPPERCLUB</h1>
          <p>The only way to find new and exciting people in your city over a shared love of food!</p>
        </div>
      </div>
    )
  }
}
