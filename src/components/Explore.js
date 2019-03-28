import React, {Component} from 'react'
import SearchedSupperCard from '../components/SearchedSupperCard'



export default class SearchedSuppers extends Component {

  render() {
    return (
      <div>
          <div className="ExploreList" >
            <h3 className="exploreTitle">EXPLORE SUPPERCLUBS</h3>
            {this.props.exploreSuppers.map(supper => <SearchedSupperCard key={supper.id} supper={supper} currentUser={this.props.currentUser} attendingSuppers={this.props.attendingSuppers} history={this.props.history} />)}
          </div>
      </div>
    )
  }
}
