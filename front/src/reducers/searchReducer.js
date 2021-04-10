import { commonActions } from './commonReducer';

export const CHANGE_WORD = 'CHANGE_WORD';
export const CHANGE_RESULT_OPT = 'CHANGE_RESULT_OPT';
export const SET_RESULT = 'SET_RESULT';

export const changeWord = (word) => (
  {
    type: CHANGE_WORD,
    word,
  }
);

export const changeResultOpt = (option) => (
  {
    type: CHANGE_RESULT_OPT,
    option,
  }
);

export const setResult = (searchWord, opt, result) => (
  {
    type: SET_RESULT,
    searchWord,
    opt,
    result,
  }
);

export const actions = {
  ...commonActions,
  changeWord,
  changeResultOpt,
  setResult,
};

const initialState = {
  beforeSearchWord: '',
  searchWord: '',
  infoResults: [],
  relResults: [],
  linkerResults: [],
  searchOpt: 'info',
};

const search = (state = initialState, action) => {
  if (action.type === SET_RESULT) {
    const updateObject = {};

    if (action.opt === 'info') {
      updateObject.infoResults = action.result.slice();
    } else if (action.opt === 'relation') {
      updateObject.relResults = action.result.slice();
    } else {
      updateObject.linkerResults = action.result.slice();
    }

    return {
      ...state,
      ...updateObject,
      beforeSearchWord: action.searchWord,
    };
  }

  if (action.type === CHANGE_WORD) {
    return {
      ...state,
      searchWord: action.word,
    };
  }

  if (action.type === CHANGE_RESULT_OPT) {
    return {
      ...state,
      searchOpt: action.option,
    };
  }

  return state;
};

export default search;
