import React, {Component} from 'react'
import '../css/Explore.css';
import SearchedSupperCard from '../components/SearchedSupperCard'



export default class SearchedSuppers extends Component {

  render() {
    return (
      <div className="Explore">
        <h3 className="title">EXPLORE SUPPERCLUB</h3>
        <div>
        {this.props.exploreSuppers.map(supper => <SearchedSupperCard key={supper.id} supper={supper} currentUser={this.props.currentUser} />)}
        </div>
      </div>
    )
  }
}
