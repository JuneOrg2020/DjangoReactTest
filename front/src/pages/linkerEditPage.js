import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/linkerEditReducer';
import SelectedInfoCard from '../components/selectedInfoCard';
import LinkerEditField from '../fields/linkerEditField';
import { commonFetch, locationTo } from '../modules/common';

class LinkerEdit extends Component {
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

  editLinker() {
    const { params } = this.props.match;
    const { action } = this.props;
    const { linker } = this.props.state.linkerEdit;

    commonFetch({
      uri: '/api/info/editLinker',
      body: {
        linkerId: params.id,
        type: linker[0].type,
        text: linker[0].text,
      },
      successCallback: () => {
        locationTo(`/linkerData/${params.id}`);
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
    const { info, linker, defaultText } = this.props.state.linkerEdit;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <SelectedInfoCard
            info={info[0]}
            isShowMap
            isShowLinkedInfo
            isShowLinker
            redirectTo={(link) => this.redirectTo(link)}
          />
          <div style={{ marginTop: '40px' }} />
          {defaultText !== ''
            ? (
              <LinkerEditField
                linkerType={linker[0].type}
                defaultText={defaultText}
                changeType={(e) => action.selectLinkerType(e)}
                changeText={(e) => action.changeText(e)}
                onClick={() => this.editLinker()}
                isEditMode
              />
            )
            : null}
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

export default connect(mapStateToProp, mapDispatchToProp)(LinkerEdit);
