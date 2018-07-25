/*global google*/
import React, { Component } from 'react';
import { Container, Segment, Form, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addHome, updateHome } from '../../../actions/index';
import { reduxForm, Field } from 'redux-form';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate';
import TextInput from './TextInput';
import TextArea from './TextArea';
import PlaceInput from './PlaceInput';
import Script from 'react-load-script';


const containerStyle = {
  marginTop: '20px'
};

const validate = combineValidators({
  title: composeValidators(
    isRequired({message: "Title is required"}),
    hasLengthBetween(4, 50)({message:"Characters must be minimum of length 4 and not more than 50"})
  )(),
  price: isRequired({message: "Price is required"}),
  rooms: isRequired({message: "Please enter the number of rooms"}),
  floor: isRequired({message: "Floor level is required"}),
  phone: isRequired({message: "Phone no. is required"}),
  city: isRequired({message: "City is required"}),
  address: isRequired({message: "Address is required"})
})

class HomeForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      scriptLoaded: false,
      cityLatLng: {},
      addressLatLng: {}
    }
  }

  handleScriptLoaded = ()=>{
    this.setState({
      scriptLoaded: true
    })
  }

  handleCitySelect = (selectedCity)=>{
    geocodeByAddress(selectedCity).then(results=>getLatLng(results[0])).then(latLng=>{
      this.setState({
        cityLatLng: latLng
      })
    }).then(()=>{
      this.props.change('city', selectedCity)
    }).catch(err=>console.log(err));
  }

  handleAddressSelect = (selectedAddress)=>{
    geocodeByAddress(selectedAddress).then(results=>getLatLng(results[0])).then(latLng=>{
      this.setState({
        addressLatLng: latLng
      })
    }).then(()=>{
      this.props.change('address', selectedAddress)
    }).catch(err=>console.log(err));
  }

  handleSubmit = (values)=>{
    values.addressLatLng = this.state.addressLatLng;
    if(values.id){
      this.props.updateHome(values);
    } else{
      const newHome = {
        ...values,
        addressLatLng: this.state.addressLatLng
      }
    this.props.addHome(newHome);
    }    
    this.props.history.push('/');
  }

  render() {
    console.log(this.state.addressLatLng);
    const {pristine, submitting, reset} = this.props;
    return (
      <Container style={containerStyle}>
        <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyBixMPuzcI8hePeazSW-JLu5QSHy986i0s&libraries=places"
          onLoad={this.handleScriptLoaded}
         />
          <Grid.Column width={10}>
            <Segment>
              <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                  <Field
                      label="Title"
                      name="title" 
                      type="text"
                      component={TextInput}
                      placeholder="Write in one sentence about your home" 
                      />
                    <Field 
                      label="Price (In Rs.)"
                      type="number" 
                      name="price"
                      component={TextInput} 
                      placeholder="Rent for per month" 
                      />
                    <Field 
                      label="No. of Rooms"
                      type="number" 
                      name="rooms"
                      component={TextInput} 
                      placeholder="Write the number of rooms available" 
                      />
                    <Field
                      label="Floor" 
                      type="number" 
                      name="floor"
                      component={TextInput} 
                      placeholder="Write in which floor the rooms are available" 
                      />
                    <Field
                      label="Phone" 
                      name="phone"
                      component={TextInput} 
                      placeholder="Enter phone number" 
                      />
                      
                    <Field 
                      label="City"
                      name="city" 
                      placeholder="City"
                      searchOptions={{types: ['(cities)']}}
                      onSelect={this.handleCitySelect}
                      component={PlaceInput}
                      />
                    {this.state.scriptLoaded &&
                    <Field
                      label="Address" 
                      name="address" 
                      placeholder="Address"
                      searchOptions={{
                        location: new google.maps.LatLng(this.state.cityLatLng),
                        radius: 100,
                        types: ['address']
                        }}
                        onSelect={this.handleAddressSelect}
                      component={PlaceInput} 
                      />}
                    <Field 
                      label="Description"
                      name="description"
                      rows={4}
                      component={TextArea}
                      placeholder="Write something about you want" 
                      />
                  <Button content="Submit" color={'green'} disabled={submitting || pristine} />
                  <Button basic content="Cancel" color={'red'} disabled={submitting || pristine} onClick={reset} />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    initialValues: state.homes.homes.find((home) => home.id === props.match.params.id)
  }
}

export default connect(mapStateToProps, {addHome, updateHome})(reduxForm({form: 'homeForm', validate, enableReinitialize: true})(HomeForm));