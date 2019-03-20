import React, { Component } from 'react'
import '../css/SupperCard.css';

export default class SupperCard extends Component {

  render() {
    return (
      <div className="card">
        <img src={this.props.supper.picture} alt="supper"/>
        <h3>{this.props.supper.name} </h3>
        <p>{this.props.supper.date}     {this.props.supper.time} </p>
      </div>
    )
  }
}
