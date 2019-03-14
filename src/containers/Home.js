import React, { Component } from 'react';
import '../css/Home.css';
import Explore from '../components/Explore'
import HomePageSearchForm from '../components/HomePageSearchForm'
import HeroImage from '../images/HeroImage.jpg'


export default class Home extends Component {

  render() {
    return (
      <div className="HomePage">
        <div className="HeroImage">
          <HomePageSearchForm />
        </div>
        <Explore />
      </div>
    )
  }

}
