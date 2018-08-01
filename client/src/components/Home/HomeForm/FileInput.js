import React, { Component } from 'react'
import { Form, Header } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';


class FileInput extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      files: []
    }
  }

  handleDrop = (files, rejectedFiles)=>{
    console.log(files);
    this.setState({
      files
    })
  }
  render() {
    const {dropzone_options} = this.props;
    return (
      <Form.Field>
        <Dropzone {...dropzone_options} onDrop={this.handleDrop}>
          <div style={{textAlign: 'center', paddingTop: '13vh'}} ><Header content="Drop image here or click to add" /></div>
        </Dropzone>
        {this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)}
      </Form.Field>
    )
  }
}

export default FileInput;
