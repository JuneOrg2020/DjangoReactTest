import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { actions } from '../reducers/userStateReducer';
import { commonFetch, locationTo } from '../modules/common';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuAnchor: null,
    };
    const { userId } = this.props.state.userState;
    const { action } = this.props;
    if (userId === '') {
      commonFetch({
        method: 'GET',
        uri: '/api/user/info/',
        body: {},
        successCallback: (json) => {
          action.setMenu(false);
          action.setUserInfo(json.username);
        },
        errorCallback: () => {
          action.setMenu(true);
          action.openModal('ログインしてください。');
          if (document.URL.indexOf('login') === -1) {
            locationTo('/login');
          }
        },
      });
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {

  }

  handleClick(e) {
    this.setState({
      menuAnchor: e.currentTarget,
    });
  }

  handleClose() {
    this.setState({
      menuAnchor: null,
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
    this.handleClose();
  }

  render() {
    const { menuAnchor } = this.state;
    const { state } = this.props;
    return (
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={this.handleClick}
          style={{ color: '#fff', textTransform: 'none' }}
        >
          {state.userState.userId === '' ? 'Guest User' : state.userState.userId}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={menuAnchor}
          keepMounted
          open={Boolean(menuAnchor)}
          onClose={this.handleClose}
          style={{ marginTop: '40px' }}
        >
          {state.userState.menu.map((item) => (
            <MenuItem onClick={() => this.redirectTo(item.linkUrl)} key={item.linkText}>
              {item.linkText}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const mapStateToProp = (state) => (
  {
    state,
  }
);

const mapDispatchToProp = (dispatch) => (
  {
    action: bindActionCreators(actions, dispatch),
  }
);

export default connect(mapStateToProp, mapDispatchToProp)(withRouter(UserMenu));
