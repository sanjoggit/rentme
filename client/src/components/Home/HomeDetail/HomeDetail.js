import React, { Component } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteHome } from '../../../actions/index';
import HomeDetailInfo from './HomeDetailInfo';
import HomeDetailHeader from './HomeDetailHeader';


export class HomeDetail extends Component {

  handleDelete = (homeId)=>{
    this.props.deleteHome(homeId);
    this.props.history.push('/');
  }

  render() {
    const homeId = this.props.match.params.id;
    const home = this.props.homes.filter(home=>home.id === homeId)[0];
    return (
      <Container>
        
        <Grid>
          <Grid.Column width={10}>
            <Button content="Back" onClick={()=>this.props.history.push('/')} />
            <Button content="Delete" color="red" floated="right" onClick={()=>this.handleDelete(homeId)} />
            <Button content="Edit" color="green" floated='right' as={Link} to={`/edit/${home.id}`} />
            <HomeDetailHeader home={home} />
            <HomeDetailInfo home={home} />
          </Grid.Column>
          <Grid.Column width={6}>
            <h1>For last viewed</h1>
          </Grid.Column> 
        </Grid>         
      </Container>
    )
  }
}

const mapStateToProps = state =>{
  return{
    homes: state.homes
  }
}

export default connect(mapStateToProps, {deleteHome})(HomeDetail);
