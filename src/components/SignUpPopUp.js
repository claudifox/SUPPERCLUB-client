import React, { Component } from 'react'
import '../css/PopUp.css';
import API from '../API.js';



export default class SignUpPopUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    email_address: "",
    profile_picture: "",
    description: "",
    password: ""
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSignUpSubmit = event => {
    event.preventDefault()
    const user = this.state
    API.createUser(user).then(data => {
      if (data.error) {
        // debugger
        alert('Email address already in use')
      } else {
        this.props.logIn(data)
      }
    })
  }


  render() {
    return (
        <form onSubmit={this.handleSignUpSubmit}>
        <input className="input" type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} />
        <input className="input" type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange}  />
          <input className="input" type="text" name="email_address" placeholder="Email Address" onChange={this.handleChange} />
          <input className="input" type="text" name="profile_picture" placeholder="Profile Picture URL" onChange={this.handleChange} />
          <input className="input" type="text" name="description" placeholder="Tell Us About Yourself..." onChange={this.handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <input type="submit" value="Sign Up" />
        </form>
    )
  }
}
