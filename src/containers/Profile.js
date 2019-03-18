import React, { Component } from 'react';


export default class Profile extends Component {

  render() {
    return (
      <div className="Profile">
        <img src={this.props.currentUser.profilePicture} />
        <h1>{this.props.currentUser.firstName} {this.props.currentUser.lastName} </h1>
        <p>{this.props.currentUser.description}</p>
      </div>
    )
  }

}
