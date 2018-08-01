import React, { Component } from 'react'
import {Grid, Segment, Input} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { searchedHomeByCity } from '../../actions/index';
import PlacesAutoComplete from 'react-places-autocomplete';
import Script from 'react-load-script';



class SearchComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      scriptLoaded: false,
      city: ''
    }
  }
  handleScriptLoaded = ()=>{
    this.setState({
      scriptLoaded: true
    })
  }
  handleChange = city =>{
    this.setState({city});
  }
  handleSelect = (city)=>{
    this.props.searchedHomeByCity(city);
  }
  
  render() {
    const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps, loading })=>(
        <Grid.Column>
        <Input
          {...getInputProps()}
          placeholder='search by city name'
          icon='search'  
        />
        {loading && <div>Loading...</div>}
          {suggestions.map((suggestion)=>(
            <Segment vertical {...getSuggestionItemProps(suggestion)} >
              {suggestion.description}
            </Segment>
          ))}
        </Grid.Column>
    )
    return (      
      <Grid>
        <Script
        url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBixMPuzcI8hePeazSW-JLu5QSHy986i0s&libraries=places"
        onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded &&
          <PlacesAutoComplete
            value={this.state.city}
            onChange={this.handleChange}
            onSelect={this.handleSelect}  
          >
          {renderFunc}
          </PlacesAutoComplete>}
      </Grid>        
    )
  }
}

const mapStateToProps = state =>{
  return{
    homes: state.homes
  }
}

export default connect(mapStateToProps, {searchedHomeByCity})(SearchComponent);
