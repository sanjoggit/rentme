import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import HomeDashboard from './components/Home/HomeDashboard/HomeDashboard';
import HomeDetail from './components/Home/HomeDetail/HomeDetail';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeForm from './components/Home/HomeForm/HomeForm';
import RegisterForm from './components/auth/RegisterForm';
import LoginForm from './components/auth/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route path="/" exact component={HomeDashboard} />
            <Route path="/homes" component={HomeDashboard} />
            <Route path="/home/:id" component={HomeDetail} />
            <Route path="/edit/:id" component={HomeForm} />
            <Route path="/createPost" component={HomeForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
