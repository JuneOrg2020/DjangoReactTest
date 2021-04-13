import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from '../reducers/linkedInfoReducer';
import SelectedInfoCard from '../components/selectedInfoCard';
import AllLinkedInfo from '../fields/allLinkedInfoField';
import LinkerEditField from '../fields/linkerEditField';
import { commonFetch, locationTo } from '../modules/common';

class LinkedInfoView extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    const { action } = this.props;

    commonFetch({
      uri: '/api/info/linked/',
      body: {
        info_id: params.id,
      },
      successCallback: (json) => {
        action.setLinkedData(json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  addLinker() {
    const { params } = this.props.match;
    const { action } = this.props;
    const { selectedInfo, selectLinkedInfoId, inputLinker } = this.props.state.linkedInfo;

    if (selectLinkedInfoId === -1) {
      action.openModal('関連付けする情報をSelectで選択してください。');
      return;
    }

    if (inputLinker.type === -1) {
      action.openModal('リンクのタイプを選択してください。');
      return;
    }

    if (inputLinker.text.length === 0) {
      action.openModal('テキストを1文字以上入力してください。');
      return;
    }

    commonFetch({
      uri: '/api/info/addLinker/',
      body: {
        info1: selectedInfo.info_id,
        info2: selectLinkedInfoId,
        type: inputLinker.type,
        text: inputLinker.text,
      },
      successCallback: () => {
        action.openModal('新しいリンクが作成されました');
        setTimeout(() => {
          action.closeModal();
          locationTo(`/linkedInfo/${params.id}`);
        }, 1000);
      },
      errorCallback: (err) => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  render() {
    const { action } = this.props;
    const { linkedInfo } = this.props.state;
    const { userId } = this.props.state.userState;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <SelectedInfoCard
            info={linkedInfo.selectedInfo}
            isEdittable={linkedInfo.selectedInfo.userId === userId}
            redirectTo={(link) => this.redirectTo(link)}
            stockAction={() => action.toggleStock()}
            isShowLinker
          />
          <LinkerEditField
            linkerType={linkedInfo.inputLinker.type}
            changeType={(e) => action.selectLinkerType(e)}
            changeText={(e) => action.changeText(e)}
            onClick={() => this.addLinker()}
          />
        </div>
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <h2>
            All Linked Info
          </h2>
          <AllLinkedInfo
            data={linkedInfo}
            userId={userId}
            redirectTo={(link) => this.redirectTo(link)}
            selectAction={(id) => action.selectInfoData(id)}
            stockAction={(itemKey) => this.stockAction(itemKey)}
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

export default connect(mapStateToProp, mapDispatchToProp)(LinkedInfoView);
