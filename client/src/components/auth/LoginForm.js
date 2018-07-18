import React, { Component } from 'react';
import { Form, Segment, Grid, Header, Button } from 'semantic-ui-react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/index';
import {
  combineValidators,
  isRequired,
} from 'revalidate';
import TextInput from '../Home/HomeForm/TextInput';

const errorStyle = {
  background: 'red',
  color: 'white',
  borderRadius: '4px'
};


const validate = combineValidators({
  email: isRequired({message: "email is required"}),  
  password: isRequired({message: "password is required"})
})

class RegisterForm extends Component {

  componentDidMount(){
    if(this.props.auth.isAuthenticated){
      this.props.history.push('/');
    }
  }

  handleSubmit = (values)=>{    
    this.props.loginUser(values, this.props.history);
  }
  render() {
    const {pristine, submitting, errors} = this.props;
    return (
      <Grid columns={1} stackable centered verticalAlign={'middle'} style={{ height: '100vh' }} >
        <Grid.Column width={6} >
        <Header size='large' textAlign="center">Login Form</Header>
          <Segment>
          <Form onSubmit={this.props.handleSubmit(this.handleSubmit)}>  
            <Field
              icon="mail"
              name="email" 
              type="text"
              component={TextInput}
              placeholder="E-mail address" 
            /> {errors ? <span style={errorStyle}>{errors.email}</span> : ''}
            <Field
              icon="lock"
              name="password" 
              type="password"
              component={TextInput}
              placeholder="Password" 
            /> {errors ? <span style={errorStyle}>{errors.password}</span> : ''}
            <Button content="Login" color="green" fluid disabled={pristine || submitting} />
          </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state =>{
  return{
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {loginUser})(reduxForm({form: 'registerForm', validate})(RegisterForm));