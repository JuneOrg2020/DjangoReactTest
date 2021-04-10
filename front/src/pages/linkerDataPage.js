import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/linkerDataReducer';
import SelectedInfoCard from '../components/selectedInfoCard';
import LinkerCard from '../components/linkerCard';
import NormalButton from '../components/normalButton';
import { commonFetch } from '../modules/common';

class LinkerData extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { action } = this.props;

    commonFetch({
      uri: '/api/info/linkerData',
      body: {
        linkerId: params.id,
      },
      successCallback: (json) => {
        action.setLinkerInfo(json);
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
    const { info, linker } = this.props.state.linkerData;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <NormalButton
            style={{ margin: '4px' }}
            title="Edit Linker"
            onClick={() => this.redirectTo(`/linkerEdit/${linker[0].linker_id}`)}
          />
          <SelectedInfoCard
            info={info[0]}
            isShowMap
            isShowLinkedInfo
            isShowLinker
            redirectTo={(link) => this.redirectTo(link)}
          />
          <div style={{ marginTop: '40px' }} />
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              margin: '4px',
              color: '#000',
            }}
          >
            <LinkerCard
              linkers={linker}
              style={{ margin: '4px' }}
            />
            {linker.text}
          </div>
          <div style={{ marginTop: '40px' }} />
          <SelectedInfoCard
            info={info[1]}
            isShowMap
            isShowLinkedInfo
            isShowLinker
            redirectTo={(link) => this.redirectTo(link)}
          />
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

export default connect(mapStateToProp, mapDispatchToProp)(LinkerData);
