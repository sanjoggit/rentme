import React, { Component } from 'react';
import { Label, Form, Segment, Container } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

class PlaceInput extends Component {
  state = {
    city: '',
    scriptLoaded: false
  }
  handleScriptLoaded = ()=>{
    this.setState({
      scriptLoaded: true
    })
  }
  handleChange = (city)=>{
    this.setState({
      city
    })
  }
  render() {
    const { label, placeholder, searchOptions, onSelect, meta:{touched, error}} = this.props;
    const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
      <div>
        <input
            {...getInputProps({                  
            placeholder
            })}
        />
        <Container>
        {loading && <div>Loading...</div>}
          {suggestions.map((suggestion)=>(
            <Segment vertical {...getSuggestionItemProps(suggestion)} >
              {suggestion.description}
            </Segment>
          ))}
        </Container>
      </div>
    )
    
    return (
      <Form.Field error={touched && !!error}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBixMPuzcI8hePeazSW-JLu5QSHy986i0s&libraries=places"
          onLoad={this.handleScriptLoaded}
         />
         <label>{label}</label>
         {this.state.scriptLoaded &&
        <PlacesAutocomplete
          value={this.state.city}
          onChange={this.handleChange}
          onSelect={onSelect}
          searchOptions={searchOptions}
        >
          {renderFunc}          
        </PlacesAutocomplete>}
        {touched && error && <Label color="red">{error}</Label>}
      </Form.Field>
    )
  }
}

export default PlaceInput;