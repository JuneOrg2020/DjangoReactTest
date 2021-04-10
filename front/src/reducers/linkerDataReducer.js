import { commonActions } from './commonReducer';

const SET_LINK_INFO = 'SET_LINK_INFO';

export const setLinkerInfo = (data) => (
  {
    type: SET_LINK_INFO,
    data,
  }
);

export const actions = {
  ...commonActions,
  setLinkerInfo,
};

const initialState = {
  linker: [],
  info: [
    {},
    {},
  ],
};

const linkerData = (state = initialState, action) => {
  if (action.type === SET_LINK_INFO) {
    return {
      ...state,
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

export default linkerData;
