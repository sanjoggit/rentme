import React from 'react';
import { Label, Form, Input } from 'semantic-ui-react';

const TextInput = ({input, label, type, placeholder, icon, meta:{touched, error}}) => {
  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      <Input
        icon={icon} 
        iconPosition="left" 
        {...input} 
        placeholder={placeholder} 
        type={type}         
        />
      {touched && error && <Label color="red">{error}</Label>}
    </Form.Field>
  )
}

export default TextInput;
