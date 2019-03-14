import React, { Component } from 'react'
import '../css/PopUp.css';


export default class LogInPopUp extends Component {


  render() {
    return (
      <div className="Form" >
        <form>
          <input className="input" type="text" name="email-address" placeholder="Email Address" />
          <input className="input" type="text" name="password" placeholder="Password" />
          <input type="submit" value="Log In" />
        </form>
      </div>
    )
  }
}
