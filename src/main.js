import React, { Component } from 'react';
import logo from './cfkalogo.png';
import './App.css';

class App extends Component {
  responseFacebook(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <div class="logo">
          <img class="resize" src={logo}/>
        </div>
        <div class="form-inline" id="form-input">
          <input class="form-control mb-2 mr-sm-2 mb-sm-0" id="input-text" type="text" placeholder="Key word"></input>
          <input class="form-control mb-2 mr-sm-2 mb-sm-0" id="input-text" type="text" placeholder="Group link"></input>
          <button class="btn btn-secondary">submit</button>
        </div>
        <div class="howto from-inline">
            <p class="inline">You must send message to&nbsp;</p>
            <a class="inline" href="https://www.messenger.com/t/502138216822140"> our page</a>
            <p class="inline">&nbsp;first !! </p>
        </div>
      </div>
    );
  }
}

export default App;
