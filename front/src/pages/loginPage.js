import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { isShowSignUp } from '../app/config';
import NormalButton from '../components/normalButton';
import { setStorage, locationTo } from '../modules/common';
import { commonFetch } from '../modules/common';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logIn: {
        email: '',
        password: '',
      },
      signUp: {
        email: '',
        username: '',
        password: '',
      },
    };
  }

  loginAction() {
    commonFetch({
      uri: '/jwt/',
      body: this.state.logIn,
      successCallback: (json) => {
        setStorage('jwt', json.token);
        locationTo('/search');
      },
      errorCallback: () => {
        alert('ログインに失敗しました');
      },
    });
  }

  signUpAction() {
    commonFetch({
      uri: '/api/user/register/',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
      },
      body: this.state.signUp,
      successCallback: (signUpjson) => {
        alert('ユーザー登録されました。');
        commonFetch({
          uri: '/jwt/',
          body: {
            email: signUpjson.email,
            password: this.state.signUp.password,
          },
          successCallback: (loginJson) => {
            setStorage('jwt', loginJson.token);
            locationTo('/search');
          },
        });
      },
      errorCallback: () => {
        alert('ユーザー登録に失敗しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  render() {
    return (
      <div className="content-width80">
        <div style={{ marginTop: '160px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ width: '55%', maxWidth: '250px' }}
            label="Input User ID"
            onChange={(e) => { this.state.logIn.email = e.target.value; }}
          />
          <br />
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ marginTop: '5px', width: '55%', maxWidth: '250px' }}
            label="Input Password"
            type="password"
            onChange={(e) => { this.state.logIn.password = e.target.value; }}
          />
          <br />
          <NormalButton
            style={{ marginTop: '4px' }}
            title="Log In"
            onClick={() => this.loginAction()}
          />
        </div>
        <div style={{ marginTop: '80px' }} />
        <div style={{
          maxWidth: '750px',
          margin: 'auto',
          display: isShowSignUp ? 'block' : 'none',
        }}
        >
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ width: '55%', maxWidth: '250px' }}
            label="Input Your Email"
            onChange={(e) => { this.state.signUp.email = e.target.value; }}
          />
          <br />
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ marginTop: '5px', width: '55%', maxWidth: '250px' }}
            label="Input User ID"
            onChange={(e) => { this.state.signUp.username = e.target.value; }}
          />
          <br />
          <TextField
            InputLabelProps={
              { style: { color: '#fff' } }
            }
            inputProps={{ style: { color: '#fff' } }}
            style={{ marginTop: '5px', width: '55%', maxWidth: '250px' }}
            label="Input Password"
            type="password"
            onChange={(e) => { this.state.signUp.password = e.target.value; }}
          />
          <br />
          <NormalButton
            style={{ marginTop: '4px' }}
            title="Sign Up"
            onClick={() => this.signUpAction()}
          />
        </div>
      </div>
    );
  }
}

export default Login;
