import React, { Component } from 'react';
import {SignUp, Home } from './containers/index';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import {ProfileContainer, ProfileChangeContainer, PasswordChangeContainer} from './containers/index';


class App extends Component {
  render() {
    return (
        <Router>
                <Route exact path="/" component={Home}/>
                <Route exact path="/accounts/signUp" component={SignUp}/>
                <Route exact path="/:id" component={ProfileContainer}/>
                <Route exact path="/accounts/edit" component={ProfileChangeContainer}/>
                <Route exact path="/accounts/password/change" component={PasswordChangeContainer}/>
        </Router>
    );
  }
}


export default App;
