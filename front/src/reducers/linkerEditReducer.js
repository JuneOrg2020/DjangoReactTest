import { commonActions } from './commonReducer';

const SET_LINK_INFO = 'SET_LINK_INFO';
const SELECT_LINKER_TYPE = 'SELECT_LINKER_TYPE';
const CHANGE_LINKER_TEXT = 'CHANGE_LINKER_TEXT';

const setLinkerInfo = (data) => (
  {
    type: SET_LINK_INFO,
    data,
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
  setLinkerInfo,
  selectLinkerType,
  changeText,
};

const initialState = {
  defaultText: '',
  linker: [
    {
      type: -1,
      text: '',
    },
  ],
  info: [
    {},
    {},
  ],
};

const linkerEdit = (state = initialState, action) => {
  if (action.type === SELECT_LINKER_TYPE) {
    return {
      ...state,
      linker: [{
        ...state.linker[0],
        type: action.linkerType,
      }],
    };
  }

  if (action.type === CHANGE_LINKER_TEXT) {
    return {
      ...state,
      linker: [
        {
          ...state.linker[0],
          text: action.text,
        },
      ],
    };
  }

  if (action.type === SET_LINK_INFO) {
    return {
      ...state,
      defaultText: action.data.text,
      linker: [
        {
          linker_id: action.data.linker_id,
          text: action.data.text,
          type: action.data.link_type,
          rType: null,
        },
      ],
      info: [
        {
          info_id: action.data.info_1_id,
          text: action.data.info_1_text,
          is_stocked: action.data.info_1_stocked,
        },
        {
          info_id: action.data.info_2_id,
          text: action.data.info_2_text,
          is_stocked: action.data.info_2_stocked,
        },
      ],
    };
  }

  return state;
};

export default linkerEdit;
