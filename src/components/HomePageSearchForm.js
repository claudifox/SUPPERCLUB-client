import React, { Component } from 'react'
import '../css/HomePageSearchForm.css';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';


export default class HomePageSearchForm extends Component {

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
