import React, { Component } from 'react'

export default class NewSupperForm extends Component {

  render() {
    return (
      <div className="NewSupperForm" >
        <h3 className="title">Want to host your own supper?</h3>
        <form>
        <label className="label">
          NAME
          <input className="input" type="text" name="where" />
        </label>
          <label className="label">
            DATE
            <input className="input" type="text" name="date" />
          </label>
          <label className="label">
            TIME
            <input className="input" type="text" name="time" />
          </label>
          <label className="label">
          WHERE
          <input className="input" type="text" name="where" />
          </label>
          <input type="submit" value="Create New Supper" />
        </form>
      </div>
    )
  }
}
