import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react';


const Loading = () => (
  <Dimmer active inverted  style={{marginTop: '30vh'}}>
    <Loader size="large">Loading...</Loader>
  </Dimmer>
)

export default Loading