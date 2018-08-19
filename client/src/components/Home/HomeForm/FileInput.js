import React, { Component } from 'react'
import { Form, Header, Icon } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


class FileInput extends Component {
  
  render() {
    const {dropzone_options, handleDrop} = this.props;
    return (
      <Form.Field>
        <Dropzone {...dropzone_options} onDrop={handleDrop}>
          <div style={{textAlign: 'center', paddingTop: '7vh'}} ><Icon link name='upload' size="big" /><Header content="Drop image here or click to add" /></div>
        </Dropzone>
      </Form.Field>
    )
  }
}

export default FileInput;
