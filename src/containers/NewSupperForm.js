import React, { Component } from 'react'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import API from '../API.js'

export default class NewSupperForm extends Component {

    state = {
      address: "",
      newSupper: {
        name: "",
        picture: "",
        description: "",
        date: "",
        time: "",
        selectedAddressLngLat: "",
        selectedAddress: "",
      },
    }

    handleChange = event => {
      this.setState({
        newSupper: {
          ...this.state.newSupper,
          [event.target.name]: event.target.value
      }}
      )
    }

    handleSelect = address => {
      this.setState({
        newSupper: {
          ...this.state.newSupper,
          selectedAddress: address
        }
      });
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          this.setState({
            newSupper: {
              ...this.state.newSupper,
              selectedAddressLngLat: latLng
          }
          })
          console.log('Success', latLng)
        })
        .catch(error => console.error('Error', error));
    };

    handleAddressChange = address => {
      this.setState({ address });
    };

    handleNewSupperSubmit = event => {
      event.preventDefault()
      API.createSupper(this.state.newSupper, this.props.currentUser)
      debugger
    }


  render() {
    return (
      <div className="NewSupperForm" >
        <h3 className="title">Want to host your own supper?</h3>
        <form method="POST" onSubmit={this.handleNewSupperSubmit}>
          <label className="label">NAME</label>
          <input className="input" type="text" name="name" value={this.state.newSupper.name} onChange={this.handleChange} autoFocus/>
          <label className="label">DESCRIPTION</label>
          <input className="input" type="text" name="description" value={this.state.newSupper.description} onChange={this.handleChange} />
          <label className="label">PHOTO</label>
          <input className="input" type="file" name="picture" onChange={this.handleChange} />
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
