import React, { Component } from 'react'
import API from '../API.js'


export default class SearchedSupperCard extends Component {

  handleAttendClick = event => {
    event.preventDefault()
    API.createBooking(this.props.supper, this.props.currentUser)
    // this.props.getAttendedSuppers()
  }

  render() {
    return (
      <div className="card">
        <img src={this.props.supper.picture} alt="supper"/>
        <h3>{this.props.supper.name} </h3>
        <p>{this.props.supper.date}{this.props.supper.time}</p>
        <button onClick={this.handleAttendClick}>Attend Supper</button>
      </div>
    )
  }
}
