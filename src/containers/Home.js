import React, { Component } from 'react';
import Explore from '../components/Explore'
import HomePageSearchForm from '../components/HomePageSearchForm'
import SearchedSuppers from './SearchedSuppers'


export default class Home extends Component {



  render() {
    return (


      <div className="HomePage">
        <div className="SearchAndResults">
          <div className="column search">
            <HomePageSearchForm
              address={this.props.address}
              givenLocation={this.props.givenLocation}
              filteredSuppers={this.props.filteredSuppers}
              handleSelect={this.props.handleSelect}
              handleAddressChange={this.props.handleAddressChange}
              handleSubmit={this.props.handleSubmit}
              />
          </div>
          <div className="column results">
            <SearchedSuppers filteredSuppers={this.props.filteredSuppers} handleAttendClick={this.props.handleAttendClick} currentUser={this.props.currentUser} getAttendedSuppers={this.props.getAttendedSuppers} history={this.props.history}/>
          </div >
        </div>
        <div className="footer">
          <Explore exploreSuppers={this.props.exploreSuppers} currentUser={this.props.currentUser} AttendingSuppers={this.props.attendedSuppers} history={this.props.history}/>
        </div>
      </div>
    )
  }

}
