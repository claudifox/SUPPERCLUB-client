import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import AttendingSuppers from './AttendingSuppers'
import AttendedSuppers from './AttendedSuppers'
import HostingSuppers from './HostingSuppers'
import HostedSuppers from './HostedSuppers'



export default class Suppers extends Component {

  state = {
    selectedTab: 'attending',

  }

  handleClick = event => {
    event.preventDefault()
    this.setState({selectedTab: event.target.getAttribute('name')})
  }

  renderSuppers = () => {
    switch(this.state.selectedTab) {
      case 'hosting':
        return <HostingSuppers hostingSuppers={this.props.futureHostingSuppers}/>
      case 'hosted':
        return <HostedSuppers hostedSuppers={this.props.pastHostedSuppers} />
      case 'attending':
        return <AttendingSuppers attendingSuppers={this.props.futureAttendingSuppers}/>
      case 'attended':
        return <AttendedSuppers attendedSuppers={this.props.pastAttendedSuppers} />
    }
  }

  render() {
    return (
      <div>
        <ul>
          <li name="hosted" className="SmallNavBarLink" onClick={this.handleClick}>Hosted</li>
          <li name="hosting" className="SmallNavBarLink" onClick={this.handleClick}>Hosting</li>
          <li name="attended" className="SmallNavBarLink" onClick={this.handleClick}>Attended</li>
          <li name="attending" className="SmallNavBarLink" onClick={this.handleClick}>Attending</li>
        </ul>

        <div>
        {this.renderSuppers()}
        </div>
      </div>
    )
  }
}
