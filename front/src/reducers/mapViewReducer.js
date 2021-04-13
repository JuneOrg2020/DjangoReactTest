import { commonActions } from './commonReducer';

export const SET_MAPDATA = 'SET_MAPDATA';
export const TOGGLE_SHOW_OTHERS = 'TOGGLE_SHOW_OTHERS';
export const CHANGE_OTHER_INFO = 'CHANGE_OTHER_INFO';
export const CHANGE_MAP_DATA = 'CHANGE_MAP_DATA';

const toggleShowOthers = (groupId) => (
  {
    type: TOGGLE_SHOW_OTHERS,
    groupId,
  }
);

const changeOtherInfo = (groupId, dataId) => (
  {
    type: CHANGE_OTHER_INFO,
    groupId,
    dataId,
  }
);

const setMapData = (data) => (
  {
    type: SET_MAPDATA,
    data,
  }
);

const changeMapData = (groupId, data) => (
  {
    type: CHANGE_MAP_DATA,
    groupId,
    data,
  }
);

export const actions = {
  ...commonActions,
  toggleShowOthers,
  changeOtherInfo,
  setMapData,
  changeMapData,
};

const initialState = {
  isShowLinker: true,
  selectedInfo: {},
  linkInfos: [],
};

const mapView = (state = initialState, action) => {
  if (action.type === TOGGLE_SHOW_OTHERS) {
    const updateLinkInfos = state.linkInfos.slice();
    updateLinkInfos[action.groupId].isShowOthers = !updateLinkInfos[action.groupId].isShowOthers;

    return {
      ...state,
      linkInfos: updateLinkInfos,
    };
  }

  if (action.type === CHANGE_OTHER_INFO) {
    const updateLinkInfos = state.linkInfos.slice();
    updateLinkInfos[action.groupId].selectOtherKey = action.dataId;
    updateLinkInfos[action.groupId].isShowOthers = false;
    return {
      ...state,
      linkInfos: updateLinkInfos,
    };
  }

  if (action.type === SET_MAPDATA) {
    const newMapData = [];
    action.data.mapData.forEach((val) => {
      newMapData.push({
        infos: val,
        selectOtherKey: 0,
        isShowOthers: false,
      });
    });

    return {
      ...state,
      selectedInfo: {
        info_id: action.data.mainData.info_id,
        text: action.data.mainData.text,
      },
      linkInfos: newMapData,
    };
  }

  if (action.type === CHANGE_MAP_DATA) {
    const addMapData = [];
    action.data.mapData.forEach((val) => {
      addMapData.push({
        infos: val,
        selectOtherKey: 0,
        isShowOthers: false,
      });
    });

    const updateLinkInfos = state.linkInfos.slice();
    let popCount = updateLinkInfos.length - action.groupId - 1;

    while (popCount > 0) {
      updateLinkInfos.pop();
      popCount -= 1;
    }

    const setLinkInfos = updateLinkInfos.concat(addMapData);

    return {
      ...state,
      linkInfos: [
        ...setLinkInfos,
      ],
    };
  }

  return state;
};

export default mapView;
