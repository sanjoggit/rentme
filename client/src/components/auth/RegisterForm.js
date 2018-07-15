import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/index';
import {
  composeValidators,
  combineValidators,
  isRequired,
  hasLengthGreaterThan,
  matchesField 
} from 'revalidate';
import TextInput from '../Home/HomeForm/TextInput';
import moment from 'moment';
import cuid from 'cuid';


const validate = combineValidators({
  username: isRequired({message: "user name is required"}),
  email: composeValidators(
    isRequired({message: "email is required"})    
  )(),
  password: composeValidators(
    isRequired({message: "password is required"}),
    hasLengthGreaterThan(6)({message: "Password must be atleast 6 character long"})
  )(),
  password2: matchesField('password')({message: "password do not match"})
})

class RegisterForm extends Component {

  handleSubmit = (values)=>{
    values.date = moment(values.date).format();
      const newUser = {
        id: cuid(),
        date: new Date(),
        ...values,
            
      }
    this.props.registerUser(newUser);
  }
  render() {
    const {pristine, submitting} = this.props;
    return (
      <Grid columns={1} stackable centered verticalAlign={'middle'} style={{ height: '100vh' }} >
        <Grid.Column width={6} >
        <Header size='large' textAlign="center">Sign-up Form</Header>
          <Segment>
          <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>            
            <Field
              icon="user"
              name="username" 
              type="text"
              component={TextInput}
              placeholder="Known as" 
            />
            <Field
              icon="mail"
              name="email" 
              type="text"
              component={TextInput}
              placeholder="E-mail address" 
            />
            <Field
              icon="lock"
              name="password" 
              type="password"
              component={TextInput}
              placeholder="Password" 
            />
            <Field
              icon="lock"
              name="password2" 
              type="password"
              component={TextInput}
              placeholder="Confirm Password" 
            />
            <Button content="Register" color="green" fluid disabled={pristine || submitting} />
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}


export default connect(null, {registerUser})(reduxForm({form: 'registerForm', validate})(RegisterForm));