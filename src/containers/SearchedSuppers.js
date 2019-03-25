import React, { Component } from 'react'
import SearchedSupperCard from '../components/SearchedSupperCard'


export default class SearchedSuppers extends Component {

  render() {
    return (
      <div>
      {this.props.filteredSuppers.map(supper => <SearchedSupperCard key={supper.id} supper={supper} currentUser={this.props.currentUser} />)}
      </div>
    )
  }
}
