import React, { Component } from 'react'
import { Card, Icon, Image, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';



class HomeList extends Component {

  render() {
    const home = this.props.homes && this.props.homes.map(home=>(    
    <Grid.Column key={home.id}>  
        <Card >
          <Image src="/assets/homes/home1.png" />
          <Card.Content>
            <Card.Meta>
              <span>Added on {format(home.date, "dddd Do MMMM YYYY")}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content>
            <Icon name="map marker" />{home.city}
          </Card.Content>
          <Card.Content>
            <Icon name="money" />{home.price} per month
          </Card.Content>          
          <Button content="View" as={Link} to={`/home/${home.id}`} />        
        </Card>
      </Grid.Column> 
    
  ))

    return (
      <Grid columns={5} stackable doubling>
        {home}
      </Grid>
    )
  }
}


const mapStateToProps = state =>{
  return{
    homes: state.homes
  }
}

export default connect(mapStateToProps)(HomeList);
