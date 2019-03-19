import React, { Component } from 'react'


export default class SupperCard extends Component {

  render() {
    return (
      <div>
        <img src={this.props.supper.picture} alt="supper"/>
        <h3>{this.props.supper.name}</h3>
        <p>{this.props.supper.description}</p>

        <p>Date: {this.props.supper.date} </p>
        <p>Time: {this.props.supper.time} </p>

      </div>
    )
  }
}
