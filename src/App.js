import React, { Component } from 'react';
import FB from 'fb';
import FacebookLogin from 'react-facebook-login';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <FacebookLogin
          appId="132412297417604"
          autoLoad={true}
          fields="name,email,picture"
          callback={this.responseFacebook}
        />
      </div>
    );
  }
}

export default App;
