import React, { PureComponent } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reducer from '../reducers';
import PersistentDrawerLeft from './drawer';
import InputData from '../pages/inputDataPage';
import MapView from '../pages/mapViewPage';
import Search from '../pages/searchPage';
import LinkedInfo from '../pages/linkedInfoPage';
import Linker from '../pages/linkerPage';
import LinkerData from '../pages/linkerDataPage';
import infoEdit from '../pages/infoEditPage';
import LinkerEdit from '../pages/linkerEditPage';
import MyPage from '../pages/myPage';
import Login from '../pages/loginPage';
import Logout from '../pages/logoutPage';
import Modal from '../pages/modal';

const store = createStore(reducer);

class TopContainer extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <PersistentDrawerLeft />
          <div className="content-area">
            <Modal />
            <Switch>
              <Route exact path="/" component={Search} />
              <Route path="/search" component={Search} />
              <Route path="/login" component={Login} />
              <Route path="/input" component={InputData} />
              <Route path="/linkedinfo/:id" component={LinkedInfo} />
              <Route path="/linker/:id" component={Linker} />
              <Route path="/linkerData/:id" component={LinkerData} />
              <Route path="/edit/:id" component={infoEdit} />
              <Route path="/linkerEdit/:id" component={LinkerEdit} />
              <Route path="/map/:id" component={MapView} />
              <Route path="/mypage" component={MyPage} />
              <Route path="/logout" component={Logout} />
            </Switch>
            <div className="footer-area" />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default TopContainer;
