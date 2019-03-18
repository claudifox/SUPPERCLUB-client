import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../css/PopUp.css';
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
    const { logIn, history } = this.props
    const user = this.state
    API.login(user).then(data => {
      if (data.error) {
        alert('Email address/password invalid')
      } else {
        logIn(data)
      }
    })
  }

  render() {
    const { email_address, password } = this.state
    const { handleChange } = this.props
    return (
      <div className="Form" >
        <form onSubmit={this.handleLogInSubmit}>
          <input className="input" type="text" name="email_address" placeholder="Email Address" autoComplete="email_address" onChange={this.handleChange} />
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          < Link to="/profile" ><input type="submit" value="Log In" /></Link>
        </form>
      </div>
    )
  }
}
