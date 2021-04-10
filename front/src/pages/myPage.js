import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/myPageReducer';
import SearchResults from '../fields/searchResultsField';
import { commonFetch } from '../modules/common';
import NormalButton from '../components/normalButton';

class MyPage extends Component {
  componentDidMount() {
    const { action } = this.props;
    commonFetch({
      uri: '/api/info/own/',
      body: {},
      successCallback: (json) => {
        action.setOwnData(json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  render() {
    const { action } = this.props;
    const { infos, stocks, selectOpt } = this.props.state.myPage;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>My Page</h2>
          <NormalButton
            title="Your Created Info"
            isColored={selectOpt === 'info'}
            style={{ margin: '4px' }}
            onClick={() => action.changeDisp('info')}
          />
          <NormalButton
            title="Your Stocked Info"
            isColored={selectOpt === 'stock'}
            style={{ margin: '4px' }}
            onClick={() => action.changeDisp('stock')}
          />

          <div style={{ display: selectOpt === 'info' ? 'block' : 'none' }}>
            <SearchResults
              data={infos}
              redirectTo={(link) => this.redirectTo(link)}
            />
          </div>
          <div style={{ display: selectOpt === 'stock' ? 'block' : 'none' }}>
            <SearchResults
              data={stocks}
              redirectTo={(link) => this.redirectTo(link)}
            />
          </div>
        </div>
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

export default connect(mapStateToProp, mapDispatchToProp)(MyPage);
