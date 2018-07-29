import React, {Component} from 'react';
import {Grid, Card, Image, Header, Item, Button} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserHome, deleteHome } from '../../actions/index';
import format from 'date-fns/format';


class Profile extends Component {
  componentDidMount(){
    this.props.getUserHome();
  }
  handleDelete = (id)=>{
    this.props.deleteHome(id);
  }
  render() {
    const {user} = this.props.auth;
    const profileHomes = this.props.profile.profileHomes.map(home=>(
       <Item.Group key={home._id}>
        <Item>
          <Item.Image src="/assets/homes/home1.png" />
          <Item.Content>
            <Item.Header as='a'>{home.address}</Item.Header>
            <Item.Description>
              <p>Floor: {home.floor}</p>
              <p>Price: {home.price}</p>
              <Button content="View" as={Link} to={`/home/${home._id}`} color="blue" />
              <Button content="Edit" as={Link} to={`/edit/${home._id}`} color="green" />
              <Button content="Delete" color="red" onClick={()=>this.handleDelete(home._id)} />
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
    ))
    return (
      <Grid style={{
        width: '70%',
        margin: '0 auto'
      }}>
        <Grid.Column width={4}>
          <Card>
            <Image src={user.avatar} />
            <Card.Content>
              <Card.Header>{user.username}</Card.Header>
              <Card.Meta>
                <span className='date'>Joined in {format(user.date, "Do MMMM YYYY")}</span>
              </Card.Meta>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={12}>
          <Header size="tiny">Homes</Header><hr/>
          {profileHomes}          
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = state =>{
  return{
    auth: state.auth,
    homes: state.homes,
    profile: state.profile
  }
}

export default connect(mapStateToProps, {getUserHome, deleteHome})(Profile);