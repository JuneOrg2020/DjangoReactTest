import { commonActions } from './commonReducer';

export const SET_TEXT = 'SET_TEXT';
export const INPUT_SEARCH = 'INPUT_SEARCH';
export const GO_SEARCH = 'GO_SEARH';
export const UPDATE_RESULT = 'UPDATE_RESULT';

export const actionTypes = {
  SET_TEXT,
  INPUT_SEARCH,
  GO_SEARCH,
  UPDATE_RESULT,
};

export const inputSearch = (e) => (
  {
    type: INPUT_SEARCH,
    word: e.target.value,
  }
);

export const setText = (text) => (
  {
    type: SET_TEXT,
    text,
  }
);

export const goSearch = (word) => (
  {
    type: GO_SEARCH,
    word,
  }
);

export const updateResult = (data) => (
  {
    type: UPDATE_RESULT,
    data,
  }
);

export const actions = {
  ...commonActions,
  inputSearch,
  setText,
  updateResult,
  goSearch,
};

const initialState = {
  text: '',
  searchResults: [],
  beforeWord: '',
  afterWord: '',
};

const inputData = (state = initialState, action) => {
  if (action.type === INPUT_SEARCH) {
    return {
      ...state,
      word: action.word,
    };
  }
  if (action.type === SET_TEXT) {
    return {
      ...state,
      text: action.text,
    };
  }

  if (action.type === GO_SEARCH) {
    return {
      ...state,
      word: action.word,
    };
  }

  if (action.type === UPDATE_RESULT) {
    return {
      ...state,
      searchResults: action.data.slice(),
    };
  }

  return state;
};

export default inputData;
