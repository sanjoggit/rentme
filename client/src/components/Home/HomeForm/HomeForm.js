import React, { Component } from 'react';
import { Container, Segment, Form, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addHome, updateHome } from '../../../actions/index';
import { reduxForm, Field } from 'redux-form';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthBetween
} from 'revalidate';
import TextInput from './TextInput';
import TextArea from './TextArea';
import cuid from 'cuid';
import moment from 'moment';

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
  address: isRequired({message: "Address no. is required"})
})

class HomeForm extends Component {


  handleSubmit = (values)=>{
    if(values.id){
      this.props.updateHome(values);
    } else{
      values.date = moment(values.date).format();
      const newHome = {
        date: new Date(),
        ...values,
        id: cuid()      
      }
    this.props.addHome(newHome);
    }    
    this.props.history.push('/');
  }

  render() {
    const {pristine, submitting, reset} = this.props;
    return (
      <Container style={containerStyle}>
        <Grid>
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
                      label="Price"
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
                      component={TextInput} 
                      />
                    <Field
                      label="Address" 
                      name="address" 
                      placeholder="Address"
                      component={TextInput} 
                      />
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
    initialValues: state.homes.find((home) => home.id === props.match.params.id)
  }
}

export default connect(mapStateToProps, {addHome, updateHome})(reduxForm({form: 'homeForm', validate, enableReinitialize: true})(HomeForm));