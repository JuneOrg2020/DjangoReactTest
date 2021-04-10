import { commonActions } from './commonReducer';

const SET_BEFORE_TEXT = 'SET_BEFORE_TEXT';
const CHANGE_EDIT_TEXT = 'CHANGE_EDIT_TEXT';
const CHANGE_LINKED_TEXT = 'CHANGE_LINKED_TEXT';

const setBeforeText = (data) => (
  {
    type: SET_BEFORE_TEXT,
    data,
  }
);

const changeEditText = (e) => (
  {
    type: CHANGE_EDIT_TEXT,
    text: e.target.value,
  }
);

const changeLinkedInfo = (e) => (
  {
    type: CHANGE_LINKED_TEXT,
    text: e.target.value,
  }
);

export const actions = {
  ...commonActions,
  setBeforeText,
  changeEditText,
  changeLinkedInfo,
};

// Initial State
const initialState = {
  isSameUser: false,
  editText: 'Before Text',
  linkedText: '',
};

const infoEdit = (state = initialState, action) => {
  if (action.type === SET_BEFORE_TEXT) {
    return {
      ...state,
      editText: action.data.info.text,
      isSameUser: action.data.isSameUser,
    };
  }

  if (action.type === CHANGE_EDIT_TEXT) {
    return {
      ...state,
      editText: action.text,
    };
  }

  if (action.type === CHANGE_LINKED_TEXT) {
    return {
      ...state,
      linkedText: action.text,
    };
  }

  return state;
};

export default infoEdit;
