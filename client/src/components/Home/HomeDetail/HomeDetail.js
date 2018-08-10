import React, { Component } from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { deleteHome, getHome } from '../../../actions/index';
import HomeDetailInfo from './HomeDetailInfo';
import HomeDetailHeader from './HomeDetailHeader';
import HomeDetailMap from './HomeDetailMap';


class HomeDetail extends Component {

  componentDidMount(){
      this.props.getHome(this.props.match.params.id);
  }

  render() {
    const home = this.props.homes.home;
    return (
      <Container>
      <Button content="Back" onClick={()=>this.props.history.push('/')} />   
        <Grid>
          <Grid.Column width={9}>
            <HomeDetailHeader home={home} />
            <HomeDetailInfo home={home} />
          </Grid.Column>
          <Grid.Column width={7}>
            <HomeDetailMap lat={home.lat} lng={home.lng} />
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
