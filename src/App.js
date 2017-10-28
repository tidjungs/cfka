import React, { Component } from 'react';
import FB from 'fb';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import logo from './cfkalogo.png';
import './App.css';

class App extends Component {
  state = {
    keytext: '',
    keysuccess: false,
    linktext: '',
    linksuccess: false
  }

  sendRequest(){
    axios.post('localhost:5000/fetch', {
      param: {
        name:"",
        user_id:"",
        group_id:"",
        keyword: "keytext",
        access_token: ""
      }
    })
  }

resetInput = () => {
  this.setState({
    keytext: '',
    keysuccess: true,
    linktext: '',
    linksuccess: true
  })
}

onclick = async () => {
  await this.sendRequest()
  this.resetInput()
}

handleChange = e => {
  this.setState({
    keytext: e.target.value,
    keysuccess: false,
    linktext: e.target.value,
    linksuccess: false
  })
}

  constructor(props) {
    super(props)
    this.state = {
      userName: ''
    }

    // window.fbAsyncInit = function() {
    //   FB.init({
    //     appId      : '132412297417604',
    //     cookie     : true,
    //     xfbml      : true,
    //     version    : 'v2.10'
    //   });
    // }
  }

  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //   if (response.status === 'connected') {
  //     console.log('you are already login')
  //     this.testAPI();
  //   } else {
  //     console.log('please login')
  //   }
  // }
  //
  // checkLoginState() {
  //   FB.getLoginStatus(function(response) {
  //     this.statusChangeCallback(response);
  //   });
  // }
  //
  // testAPI() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', function(response) {
  //     console.log('Successful login for: ' + response.name);
  //   });
  // }

  responseFacebook(response) {
    console.log(response);
    this.setState({userName: response.name})
    console.log(this.state.userName)
  }

  render() {
    if(this.state.userName)
      return (
        <div className="App">
          <div className="logo">
            <img className="resize" src={logo}/>
          </div>
          <div className="form-inline" id="form-input">
            <input className="form-control mb-2 mr-sm-2 mb-sm-0" id="input-text" type="text" placeholder="Key word"></input>
            <input className="form-control mb-2 mr-sm-2 mb-sm-0" id="input-text" type="text" placeholder="Group link"></input>
            <button className="btn btn-secondary">submit</button>
          </div>
          <div className="howto from-inline">
              <p className="inline">You must send message to&nbsp;</p>
              <a className="inline" href="https://www.messenger.com/t/502138216822140"> our page</a>
              <p className="inline">&nbsp;first !! </p>
          </div>
        </div>
      )
    else
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