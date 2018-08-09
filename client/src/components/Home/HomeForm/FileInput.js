import React, { Component } from 'react'
import { Form, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


class FileInput extends Component {
  
  render() {
    const {dropzone_options, handleDrop} = this.props;
    return (
      <Form.Field>
        <Dropzone {...dropzone_options} onDrop={handleDrop}>
          <div style={{textAlign: 'center', paddingTop: '13vh'}} ><Header content="Drop image here or click to add" /></div>
        </Dropzone>
        {/* {this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)} */}
      </Form.Field>
    )
  }
}

export default FileInput;
