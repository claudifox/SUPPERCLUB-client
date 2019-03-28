import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import API from '../API.js';

export default class LogInPopUp extends Component {

    state = {
    email_address: "",
    password: ""
  }

  handleChange = event => {
  this.setState({[event.target.name]: event.target.value})
  }

  handleLogInSubmit = event => {
    event.preventDefault()
    const user = this.state
    API.login(user).then(data => {
      if (data.error) {
        alert('Email address/password invalid')
      } else {
        this.props.logIn(data)
      }
    })
  }

  render() {

    return (
      <div className="Form" >
        <form onSubmit={this.handleLogInSubmit}>
          <input className="input" type="email" name="email_address" placeholder="Email Address" autoComplete="email_address" onChange={this.handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <input type="submit" value="Log In"/>
        </form>
      </div>
    )
  }
}
