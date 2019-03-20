import React, { Component } from 'react';
import '../css/Home.css';
import Explore from '../components/Explore'
import HomePageSearchForm from '../components/HomePageSearchForm'


export default class Home extends Component {

  render() {
    return (
      <div className="HomePage">
        <div className="HeroImage">
          <HomePageSearchForm
            address={this.props.address}
            givenLocation={this.props.givenLocation}
            filteredSuppers={this.props.filteredSuppers}
            handleSelect={this.props.handleSelect}
            handleAddressChange={this.props.handleAddressChange}
            />
        </div>
        <Explore />
      </div>
    )
  }

}
