import React, { Component } from 'react'
import '../css/SupperCard.css';

export default class SupperCard extends Component {

  render() {
    // debugger
    return (
      <div className="SupperItem">
        <img className="supperImage" src={this.props.supper.picture} alt={this.props.supper.name}/>
        <h3>{this.props.supper.name} </h3>
        <p className="DateTimeAddress">
          <img className="icon" src="https://img.icons8.com/wired/50/000000/calendar.png"/>    {this.props.supper.date}
        </p>
        <p className="DateTimeAddress">
          <img className="icon" src="https://img.icons8.com/wired/50/000000/clock.png"/>    {this.props.supper.time}
        </p>
        <p className="DateTimeAddress">
          <img className="icon" src="https://img.icons8.com/wired/50/000000/address.png"/>    {this.props.supper.address}
        </p>
      </div>
    )
  }
}
