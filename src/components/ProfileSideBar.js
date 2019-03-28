import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Profile  from './Profile.js'
import EditPersonalInfo from './EditPersonalInfo.js'

export default class ProfileSideBar extends Component {

  state = {
    selectedTab: 'all',

  }

  handleClick = event => {
    event.preventDefault()
    this.setState({selectedTab: event.target.getAttribute('name')})
  }

  renderSuppers = () => {
    switch(this.state.selectedTab) {
      case 'personal':
        return <EditPersonalInfo currentUser={this.props.currentUser} history={this.props.history} getUserInfo={this.props.getUserInfo}/>

      case 'all':
        return <Profile currentUser={this.props.currentUser}/>
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li name="all" className="SmallNavBarLink" onClick={this.handleClick}>Your Full Profile</li>
          <li name="personal" className="SmallNavBarLink" onClick={this.handleClick}>Edit Personal Information</li>

        </ul>

        <div>
        {this.renderSuppers()}
        </div>
      </div>
    )
  }
}
