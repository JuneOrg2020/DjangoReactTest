import React, { Component } from 'react';
import { removeStorage, locationTo } from '../modules/common';

class Logout extends Component {
  componentDidMount() {
    removeStorage('jwt');
    locationTo('login');
  }

  render() {
    return (
      <div className="content-width80">
        <h2>ログアウトしました。</h2>
      </div>
    );
  }
}

export default Logout;
