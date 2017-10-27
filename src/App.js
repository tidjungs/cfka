import React, { Component } from 'react';
import FB from 'fb';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '132412297417604',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.10'
      });
    }
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      console.log('you are already login')
      this.testAPI();
    } else {
      console.log('please login')
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }

  testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
    });
  }

  responseFacebook(response) {
    console.log(response);
    this.setState({userName: response.name})
    console.log(this.state.userName)
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
          appId="132412297417604"
          autoLoad={true}
          fields="name,email"
          callback={this.responseFacebook.bind(this)}
        />
      </div>
    );
  }
}

export default App;
