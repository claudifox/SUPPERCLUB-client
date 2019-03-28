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
        lat: 0.0,
        lng: 0.0,
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
        address: address,
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
              lat: latLng.lat,
              lng: latLng.lng
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

    }


  render() {
    return (
      <div className="NewSupperEditForm" >
        <h3 className="title">Want to host your own supper?</h3>
        <form method="POST" onSubmit={this.handleNewSupperSubmit}>
          <label className="label">NAME OF SUPPER (32 Characters Max.)</label>
          <input className="input" maxLength="33" type="text" placeholder="Make it stand out ..." name="name" value={this.state.newSupper.name} onChange={this.handleChange} autoFocus/>
          <label className="label">DESCRIPTION</label>
          <textarea className="input" type="text" placeholder="What are you making? Is it Veggie or Vegan? Will Booze be provided? Tell your potential guests every detail!" name="description" value={this.state.newSupper.description} onChange={this.handleChange} />
          <label className="label">PHOTO (URL)</label>
          <input className="input" type="text" placeholder="Take a stellar snap!" name="picture" onChange={this.handleChange} />
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
                      <span>{suggestion.description.toLowerCase().includes('uk') ? suggestion.description : ""}</span>
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
