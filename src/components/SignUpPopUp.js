import React, { Component } from 'react'
import '../css/PopUp.css';
import API from '../API.js';



export default class SignUpPopUp extends Component {
  state = {
    first_name: "",
    last_name: "",
    email_address: "",
    password: ""
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSignUpSubmit = event => {
    event.preventDefault()
    const { logIn, history } = this.props
    const user = this.state
    API.create(user).then(data => {
      if (data.error) {
        alert('Email address already in use')
      } else {
        logIn(data)
        history.push("/profile")
      }
    })
  }


  render() {
    return (
      <div className="Form" >
        <form onSubmit={this.handleLogInSubmit}>
        <input className="input" type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} />
        <input className="input" type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange}  />
          <input className="input" type="text" name="email_address" placeholder="Email Address" onChange={this.handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}
