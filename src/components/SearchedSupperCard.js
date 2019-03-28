import React, { Component } from 'react'
import API from '../API.js'
// import Clock from '../images/Clock.jpg'
// import Calendar from '../images/Calendar.jpg'

export default class SearchedSupperCard extends Component {

  handleAttendClick = event => {
    event.preventDefault()
    API.createBooking(this.props.supper, this.props.currentUser)
    this.props.history.push('/suppers')
  }

  render() {
    return (
      <div className="SupperItem">
        <img className="supperImage" src={this.props.supper.picture} alt={this.props.supper.name}/>
        <h3>{this.props.supper.name} </h3>
        <p className="DateTimeAddress">
          <img className="icon" src="https://img.icons8.com/wired/50/000000/calendar.png"/>
          {this.props.supper.date}
        </p>
        <p className="DateTimeAddress">
          <img className="icon" src="https://img.icons8.com/wired/50/000000/clock.png"/>
          {this.props.supper.time}
        </p>
        <button className="AttendButton" onClick={this.handleAttendClick}>Attend Supper</button>
      </div>
    )
  }
}
