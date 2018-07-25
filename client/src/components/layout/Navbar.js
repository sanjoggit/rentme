import React, { Component } from 'react';
import { Menu, Button, Dropdown, Image } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/index';
import { withRouter } from 'react-router-dom';


class Navbar extends Component {

	handleSignOut = ()=>{
		this.props.logoutUser();
		this.props.history.push('/');
	}

	render() {
		const {isAuthenticated, user} = this.props.auth;
		const signedInMenu = (
			<Menu.Item position="right">
      <Image avatar spaced="right" src={user.avatar}/>
      <Dropdown pointing="top right" text={user.username}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/createPost" text="Create Ad" icon="plus"/>
          <Dropdown.Item text="My Profile" icon="user" as={Link} to={`/${user.username}`} />
          <Dropdown.Item text="Sign Out" icon="power" onClick={this.handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
		);
		const signedOutMenu = (
			<Menu.Menu position="right">
					<Menu.Item as={Link} to="/login" name="Login" />
					<Menu.Item as={Link} to="/register" name="SignUp" />
			</Menu.Menu>
		);
		return (
			<Menu attached inverted>
			<Menu.Item className={'logo'}>
				<img src="/assets/logo.png" alt="logo" />
				Rent-Me
			</Menu.Item>
			<Menu.Item as={Link} to="/" name="Homes" />
			{isAuthenticated &&<Menu.Item><Button as={Link} to="/createPost" color="orange" content="Create Ad" /></Menu.Item>}
				{isAuthenticated ? signedInMenu : signedOutMenu}
		</Menu>
		)
	}
}

const mapStateToProps = state =>{
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logoutUser})(withRouter(Navbar));
