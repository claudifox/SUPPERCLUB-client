import React, { Component } from 'react'
import '../css/HomePageSearchForm.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


export default class HomePageSearchForm extends Component {

  // state = {
  //   address: "",
  //   givenLocation: {
  //     lat: 0.0,
  //     lng: 0.0,
  //     selectedAddress: "",
  //   }
  // }
  //
  // handleSelect = address => {
  //   this.setState({
  //     givenLocation: {
  //       ...this.state.givenLocation,
  //       selectedAddress: address
  //     }
  //   });
  //   geocodeByAddress(address)
  //     .then(results => getLatLng(results[0]))
  //     .then(latLng => {
  //       this.setState({
  //         givenLocation: {
  //           ...this.state.givenLocation,
  //           lat: latLng.lat,
  //           lng: latLng.lng
  //       }
  //       })
  //       console.log('Success', latLng)
  //       this.props.filteredSuppers()
  //     })
  //     .catch(error => console.error('Error', error));
  //
  // };
  //
  // handleAddressChange = address => {
  //   this.setState({ address });
  // };
  //

  render() {
  return (
    <div className="SearchForm" >
      <h3 className="title">Find a unique experience.</h3>
      <form>
        <label className="label">WHERE</label>
        <PlacesAutocomplete
          value={this.props.address}
          onChange={this.props.handleAddressChange}
          onSelect={this.props.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}
}
