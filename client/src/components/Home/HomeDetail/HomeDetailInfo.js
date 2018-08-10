import React, { Component } from 'react'
import { Segment, Icon, Grid } from 'semantic-ui-react';
import format from 'date-fns/format';

class HomeDetailInfo extends Component {

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
          Floor {home.floor} 
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
        </Grid>
      </Segment>      
    </Segment.Group>
    )
  }
}


export default HomeDetailInfo;
