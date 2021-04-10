import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { actions } from '../reducers/mapViewReducer';
import SelectedInfoCard from '../components/selectedInfoCard';
import ToggleInfosField from '../fields/toggleInfosField';
import { commonFetch } from '../modules/common';

class MapView extends Component {
  componentDidMount() {
    this.resetData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.resetData();
    }
  }

  resetData() {
    const { params } = this.props.match;
    const { action } = this.props;
    commonFetch({
      uri: '/api/info/map/',
      body: {
        info_id: params.id,
      },
      successCallback: (json) => {
        action.setMapData(json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
  }

  redirectTo(link) {
    this.props.history.push(link);
  }

  selectOtherInfo(groupId, index) {
    const { action } = this.props;
    const { linkInfos } = this.props.state.mapView;
    commonFetch({
      uri: '/api/info/map/',
      body: {
        info_id: linkInfos[groupId].infos[index].info_id,
      },
      successCallback: (json) => {
        action.changeMapData(groupId, json);
      },
      errorCallback: () => {
        action.openModal('エラーが発生しました');
      },
    });
    action.changeOtherInfo(groupId, index);
  }

  render() {
    const { action } = this.props;
    const { selectedInfo, linkInfos } = this.props.state.mapView;
    const { userId } = this.props.state.userState;

    return (
      <div className="content-width80">
        <div style={{ marginTop: '80px' }} />
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          <SelectedInfoCard
            isSelected
            info={selectedInfo}
            isEdittable={selectedInfo.isEditable}
            redirectTo={(link) => this.redirectTo(link)}
            stockAction={() => action.toggleStock()}
            isShowLinker
            isShowLinkedInfo
          />
        </div>
        <div style={{ maxWidth: '750px', margin: 'auto' }}>
          {linkInfos.map((item, index) => (
            <div key={item.infos[item.selectOtherKey].info_id}>
              <div style={{ width: '25px', margin: 'auto' }}>
                <ArrowDownwardIcon />
              </div>
              <ToggleInfosField
                groupId={index}
                data={item}
                userId={userId}
                changeOtherInfo={(groupId, dataId) => this.selectOtherInfo(groupId, dataId)}
                toggleShowOthers={(groupId) => action.toggleShowOthers(groupId)}
                redirectTo={(link) => this.redirectTo(link)}
                stockAction={
                  (groupId, itemKey) => action.toggleStockMapAry(groupId, itemKey)
                }
              />
            </div>
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

export default connect(mapStateToProp, mapDispatchToProp)(MapView);
