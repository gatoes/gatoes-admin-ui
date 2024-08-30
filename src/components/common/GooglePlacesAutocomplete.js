import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: props.address?props.address:'',
      placeholder: props.placeholder?props.placeholder:'Search Places ...',
      name: props.name?props.name: 'mapAddress'
    };

  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then((results) => {
        this.props.updateFormattedAddress(results[0].formatted_address);
        getLatLng(results[0]).then((latLng) => {
          this.props.updateLatLng(latLng);
        })
      })
      .catch(error => console.error('Error', error));
  };

  componentWillReceiveProps(nextProps){

    if(this.props.address != nextProps.address){

      this.setState({address: nextProps.address});
    }
  }

  render() {
    //console.log('add', this.state.address);
    return (
      <PlacesAutocomplete
        name="mapAddress"
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: this.state.placeholder,
                name: this.state.name,
                className: 'location-search-input form-control',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
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
    );
  }
}