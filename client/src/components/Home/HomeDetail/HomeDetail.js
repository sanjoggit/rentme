import React, { Component } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteHome, getHome } from '../../../actions/index';
import HomeDetailInfo from './HomeDetailInfo';
import HomeDetailHeader from './HomeDetailHeader';


class HomeDetail extends Component {

  // handleDelete = (homeId)=>{
  //   this.props.deleteHome(homeId);
  //   this.props.history.push('/');
  // }
  componentDidMount(){
      this.props.getHome(this.props.match.params.id);
  }

  render() {
    const home = this.props.homes.home;
    const {isAuthenticated} = this.props.auth;    
    return (
      <Container>
        <Grid>
          <Grid.Column width={10}>
            <Button content="Back" onClick={()=>this.props.history.push('/')} />
            {isAuthenticated && <Button content="Delete" color="red" floated="right" onClick={()=>this.handleDelete(home._id)} />}
            {isAuthenticated && <Button content="Edit" color="green" floated='right' as={Link} to={`/edit/${home._id}`} />}
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
    homes: state.homes,
    auth: state.auth,
    errors: state.errors
  }
}

export default connect(mapStateToProps, {deleteHome, getHome})(HomeDetail);
