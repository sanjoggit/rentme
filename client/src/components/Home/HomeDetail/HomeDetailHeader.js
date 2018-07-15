import React, { Component } from 'react';
import { Image, Segment, Header } from 'semantic-ui-react';

const homeImageStyle = {
  width: '100%',
  maxHeight: '45vh',
  objectFit: 'cover'
};

class HomeDetailHeader extends Component {
  render() {
    const {home} = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Image src="/assets/homes/home1.png" style={homeImageStyle} />
          <Segment basic clearing>
            <Header as='h3' floated='right'>
              Rs. {home.price}/month
            </Header>
            <Header as='h3' floated='left'>
              {home.title} 
            </Header>
          </Segment>
        </Segment>              
      </Segment.Group>

    )
  }
}

export default HomeDetailHeader;
