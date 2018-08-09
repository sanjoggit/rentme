import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import HomeList from '../HomeList/HomeList';
import SearchComponent from '../../Search/SearchComponent';

class HomeDashboard extends Component {


  render() {
    return (
      <Container fluid>
        <SearchComponent />
        <Grid>
           <HomeList />
        </Grid>
    </Container>   
    )
  }
}

export default HomeDashboard;
