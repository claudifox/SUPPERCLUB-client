import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SupperCard from '../components/SupperCard'



export default class AttendingSuppers extends Component {


  render() {
    return (
      <div className="SupperContainer">
        <div className="SupperList">
        {this.props.attendingSuppers.map(supper => <SupperCard key={supper.id} supper={supper} />)}
        </div>
      </div>
    )
  }

}
