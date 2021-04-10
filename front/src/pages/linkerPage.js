import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/linkerReducer';
import SelectedInfoCard from '../components/selectedInfoCard';
import NormalButton from '../components/normalButton';
import { commonFetch } from '../modules/common';

class Linker extends Component {
  componentDidMount() {
    const { action, match } = this.props;
    const { params } = match;

    commonFetch({
      uri: '/api/info/allLinkers',
      body: {
        infoId: params.id,
      },
      successCallback: (json) => {
        action.setInfo(json);
      },
      errorCallback: (err) => {
        console.log(err);
        action.openModal('エラーが発生しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  render() {
    const { selectedInfo, linkers } = this.props.state.linker;
    const { userId } = this.props.state.userState;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <SelectedInfoCard
            info={selectedInfo}
            isEdittable={selectedInfo.userId === userId}
            redirectTo={(link) => this.redirectTo(link)}
            isShowMap
            isShowLinkedInfo
          />
        </div>
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>
            All Linkers
          </h2>
          {linkers.map((item) => (
            <NormalButton
              key={item.linker_id}
              style={{ margin: '6px' }}
              title={item.text}
              onClick={() => this.redirectTo(`/linkerData/${item.linker_id}`)}
            />
          ))}
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

export default connect(mapStateToProp, mapDispatchToProp)(Linker);
