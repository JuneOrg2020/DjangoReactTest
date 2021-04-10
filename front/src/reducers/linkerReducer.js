import { commonActions } from './commonReducer';

export const SET_INFO = 'SET_INFO';

export const setInfo = (data) => (
  {
    type: SET_INFO,
    data,
  }
);

export const actions = {
  ...commonActions,
  setInfo,
};

const initialState = {
  selectedInfo: {},
  linkers: [],
};

const linker = (state = initialState, action) => {
  if (action.type === SET_INFO) {
    return {
      ...state,
      selectedInfo: {
        ...action.data.info,
      },
      linkers: action.data.linkers.slice(),
    };
  }

  return state;
};

export default linker;
