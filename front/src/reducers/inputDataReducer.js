import { commonActions } from './commonReducer';

export const SET_TEXT = 'SET_TEXT';
export const REALTIME_SEARCH = 'REALTIME_SEARCH';

export const realTimeSearch = (e) => (
  {
    type: REALTIME_SEARCH,
    word: e.target.value,
  }
);

export const setText = (text) => (
  {
    type: SET_TEXT,
    text,
  }
);

export const actions = {
  ...commonActions,
  realTimeSearch,
  setText,
};

const initialState = {
  text: '',
  searchResults: [],
  beforeWord: '',
  afterWord: '',
};

const inputData = (state = initialState, action) => {
  if (action.type === REALTIME_SEARCH) {
    return {
      ...state,
      beforeWord: state.afterWord,
      afterWord: action.word,
    };
  }
  if (action.type === SET_TEXT) {
    return {
      ...state,
      text: action.text,
    };
  }

  return state;
};

export default inputData;
