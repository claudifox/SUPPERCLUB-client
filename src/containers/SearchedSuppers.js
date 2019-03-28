import React, { Component } from 'react'
import SearchedSupperCard from '../components/SearchedSupperCard'

export default class SearchedSuppers extends Component {

  render() {
    return (
      <div className="SupperContainer">
        <div className="SupperList">
        {this.props.filteredSuppers.map(supper =>
            <SearchedSupperCard key={supper.id} supper={supper} currentUser={this.props.currentUser} history={this.props.history}/>
        )}
        </div>
      </div>
    )
  }
}
