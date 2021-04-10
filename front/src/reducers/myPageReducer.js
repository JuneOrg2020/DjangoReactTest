import { commonActions } from './commonReducer';

const SET_OWN_DATA = 'SET_OWN_DATA';
const CHANGE_DISP = 'CHANGE_DISP';

const setOwnData = (data) => (
  {
    type: SET_OWN_DATA,
    data,
  }
);

const changeDisp = (dispName) => (
  {
    type: CHANGE_DISP,
    dispName,
  }
);

export const actions = {
  ...commonActions,
  setOwnData,
  changeDisp,
};

const initialState = {
  infos: [],
  stocks: [],
  selectOpt: 'info',
};

const myPage = (state = initialState, action) => {
  if (action.type === SET_OWN_DATA) {
    return {
      ...state,
      infos: action.data.info.slice(),
      stocks: action.data.stock.slice(),
    };
  }

  if (action.type === CHANGE_DISP) {
    return {
      ...state,
      selectOpt: action.dispName,
    };
  }

  return state;
};

export default myPage;
