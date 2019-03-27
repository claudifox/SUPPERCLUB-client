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
      <div className="card">
        <img className="supperImage" src={this.props.supper.picture} alt="supper"/>
        <h3>{this.props.supper.name} </h3>
        <p>{this.props.supper.date}{this.props.supper.time}</p>
        <button onClick={this.handleAttendClick}>Attend Supper</button>
      </div>
    )
  }
}
