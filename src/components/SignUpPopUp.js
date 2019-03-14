import React, { Component } from 'react'
import '../css/PopUp.css';


export default class SignUpPopUp extends Component {


  render() {
    return (
      <div className="Form" >
        <form>
        <input className="input" type="text" name="first-name" placeholder="First Name" />
        <input className="input" type="text" name="last-name" placeholder="Last Name" />
          <input className="input" type="text" name="email-address" placeholder="Email Address" />
          <input className="input" type="text" name="password" placeholder="Password" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    )
  }
}
