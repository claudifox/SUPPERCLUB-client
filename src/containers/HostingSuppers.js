import React, { Component } from 'react';
import SupperCard from '../components/SupperCard'


export default class HostingSuppers extends Component {


  render() {
    return (
      <div className="SupperContainer">
        <div className="SupperList">
        {this.props.hostingSuppers.map(supper => <SupperCard key={supper.id} supper={supper} />)}
        </div>
      </div>
    )
  }

}
