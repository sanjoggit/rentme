import React, { Component } from 'react'
import { Segment, Button, Icon, Grid } from 'semantic-ui-react';
import format from 'date-fns/format';
import HomeDetailMap from './HomeDetailMap';

class HomeDetailInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      showMap: false
    }
  }

  showMapToggle = ()=>{
    this.setState({
      showMap: !this.state.showMap
    })
  }
  render() {
    const {home} = this.props;
    return (
      <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon name="calendar" />
          </Grid.Column>
          <Grid.Column width={15}>
            Added on {format(home.date, "dddd Do MMMM YYYY")}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            {home.description}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon name="hotel" />
          </Grid.Column>
          <Grid.Column width={13}>
            {home.rooms} Rooms
          </Grid.Column>
          <Grid.Column width={2}>
            {home.floor} Floor
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon name="phone" />
          </Grid.Column>
          <Grid.Column width={15}>
            {home.phone}
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment>
        <Grid>
          <Grid.Column width={1}>
            <Icon name="map marker alternate" />
          </Grid.Column>
          <Grid.Column width={10}>
            {home.address}
          </Grid.Column>
          <Grid.Column width={5}>
            <Button onClick={this.showMapToggle} floated="right" color={'green'}>{this.state.showMap ? 'Hide Map' : 'Show Map'}</Button>  
          </Grid.Column>
        </Grid>
      </Segment>
      {this.state.showMap &&
      <HomeDetailMap lat={home.addressLatLng.lat} lng={home.addressLatLng.lng} />}
    </Segment.Group>
    )
  }
}


export default HomeDetailInfo;
