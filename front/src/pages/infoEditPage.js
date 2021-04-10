import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/infoEditReducer';
import PageTitle from '../components/pageTitle';
import CommonTextArea from '../components/commonTextArea';
import NormalButton from '../components/normalButton';
import { commonFetch, locationTo } from '../modules/common';

class InfoEdit extends Component {
  componentDidMount() {
    const { action } = this.props;
    const { params } = this.props.match;

    commonFetch({
      uri: '/api/info/one',
      body: {
        info_id: params.id,
      },
      successCallback: (json) => {
        action.setBeforeText(json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  updateInfo() {
    const { action } = this.props;
    const { editText } = this.props.state.infoEdit;
    commonFetch({
      uri: '/api/info/update/',
      body: {
        text: editText,
      },
      successCallback: (data) => {
        locationTo(`/map/${data.id}`);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  addLinkedInfo() {
    const { action } = this.props;
    const { linkedText } = this.props.state.infoEdit;
    const { params } = this.props.match;

    commonFetch({
      uri: '/api/info/addInfo/',
      body: {
        text: linkedText,
        linkedId: params.id,
      },
      successCallback: (data) => {
        locationTo(`/edit/${data.id}`);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  render() {
    const { action } = this.props;
    const { editText, isSameUser } = this.props.state.infoEdit;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '160px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <PageTitle text="Edit" />
          <div>
            <CommonTextArea
              value={editText}
              isDisabled={!isSameUser}
              onChange={(e) => action.changeEditText(e)}
            />
            <div>
              <NormalButton
                isHidden={!isSameUser}
                title="Update"
                style={{ marginTop: '3px' }}
                onClick={() => this.updateInfo()}
              />
            </div>
            <PageTitle text="Add Linked Info" />
            <CommonTextArea
              onChange={(e) => action.changeLinkedInfo(e)}
            />
            <div>
              <NormalButton
                title="Add"
                style={{ marginTop: '3px' }}
                onClick={() => this.addLinkedInfo()}
              />
            </div>
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

export default connect(mapStateToProp, mapDispatchToProp)(InfoEdit);
