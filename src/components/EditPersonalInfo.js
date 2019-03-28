import React, { Component } from 'react';
import API from '../API.js'

export default class EditPersonalInfo extends Component {

  state = {
      first_name: this.props.currentUser.firstName,
      last_name: this.props.currentUser.lastName,
      description: this.props.currentUser.description,
      email_address: this.props.currentUser.emailAddress,
      profile_picture: this.props.currentUser.profilePicture,
      id: this.props.currentUser.userId,
  }

  handleChange = event => {
  this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()
    API.editUser(this.state)
    this.props.getUserInfo(this.state)
    
  }


  render() {
    return (
      <div className="NewSupperEditForm">
      <h3 className="title">Edit Your Personal Information</h3>
        <form onSubmit={this.handleSubmit} >
        <input className="input" type="text" name="first_name"  defaultValue={this.props.currentUser.firstName} onChange={this.handleChange} />
        <input className="input" type="text" name="last_name" defaultValue={this.props.currentUser.lastName} onChange={this.handleChange}  />
          <textarea className="input" type="text" name="description" defaultValue={this.props.currentUser.description} onChange={this.handleChange} />
          <input type="submit" value="Edit Info" />
        </form>

      </div>

    )
  }

}
