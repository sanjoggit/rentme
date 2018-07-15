import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextArea = ({input, label, type, placeholder, rows, meta:{touched, error}}) => {
  return (
    <Form.Field>
      <label>{label}</label>
      <textarea {...input} placeholder={placeholder} type={type} rows={rows} />
      {touched && error && <Label basic color="red">{error}</Label>}
    </Form.Field>
  )
}

export default TextArea;
