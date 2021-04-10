import { commonActions } from './commonReducer';

export const SET_LINKED_DATA = 'SET_LINKED_DATA';
export const SELECT_INFO_DATA = 'SELECT_INFO_DATA';
export const SELECT_LINKER_TYPE = 'SELECT_LINKER_TYPE';
export const CHANGE_LINKER_TEXT = 'CHANGE_LINKER_TEXT';

const setLinkedData = (data) => (
  {
    type: SET_LINKED_DATA,
    data,
  }
);

const selectInfoData = (infoId) => (
  {
    type: SELECT_INFO_DATA,
    infoId,
  }
);

const selectLinkerType = (e) => (
  {
    type: SELECT_LINKER_TYPE,
    linkerType: e.target.value,
  }
);

const changeText = (e) => (
  {
    type: CHANGE_LINKER_TEXT,
    text: e.target.value,
  }
);

export const actions = {
  ...commonActions,
  setLinkedData,
  selectInfoData,
  selectLinkerType,
  changeText,
};

const initialState = {
  selectLinkedInfoId: -1,
  inputLinker: {
    type: -1,
    text: '',
  },
  selectedInfo: {},
  allInfo: [{
    info_id: -1,
    linker: [],
  }],
};

const linkedInfo = (state = initialState, action) => {
  if (action.type === SELECT_LINKER_TYPE) {
    return {
      ...state,
      inputLinker: {
        ...state.inputLinker,
        type: action.linkerType,
      },
    };
  }

  if (action.type === CHANGE_LINKER_TEXT) {
    return {
      ...state,
      inputLinker: {
        ...state.inputLinker,
        text: action.text,
      },
    };
  }

  if (action.type === SELECT_INFO_DATA) {
    return {
      ...state,
      selectLinkedInfoId: action.infoId,
    };
  }

  if (action.type === SET_LINKED_DATA) {
    const newLinkedData = [];
    action.data.linkedData.forEach((val) => {
      newLinkedData.push({
        ...val,
        isSelected: false,
      });
    });

    return {
      ...state,
      selectedInfo: action.data.mainData,
      allInfo: newLinkedData,
    };
  }

  return state;
};

export default linkedInfo;
