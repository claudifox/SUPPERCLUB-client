import React, { Component } from 'react'
import LocationSearchInput from '../components/LocationSearchInput'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';



export default class NewSupperForm extends Component {

    state = {
      name: "",
      date: "",
      time: "",
      address: "",
      selectedAddressLngLat: "",
      selectedAddress: "",
    }

    handleChange = event => {
      this.setState({[event.target.name]: event.target.value})
    }

    handleAddressChange = address => {
      this.setState({ address });
    };

    handleSelect = address => {
      this.setState({
        selectedAddress: address });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          this.setState({
            selectedAddressLngLat: latLng
          })
          console.log('Success', latLng)
        })
        .catch(error => console.error('Error', error));
    };

    handleSubmit = event => {

    }

  render() {
    return (
      <div className="NewSupperForm" >
        <h3 className="title">Want to host your own supper?</h3>
        <form>
        <label className="label">
          NAME
          <input className="input" type="text" name="name" value ={this.state.name} onChange={this.handleChange} />
        </label>
          <label className="label">DATE </label>
          <input className="input" type="date" name="date" onChange={this.handleChange} />

          <label className="label">TIME </label>
          <input className="input" type="time" name="time" onChange={this.handleChange} />

          <label className="label">WHERE</label>
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleAddressChange}
            onSelect={this.handleSelect}
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
          <input type="submit" value="Create New Supper" />
        </form>
      </div>
    )
  }
}
