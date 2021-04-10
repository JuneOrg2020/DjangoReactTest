export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const openModal = (message) => (
  {
    type: OPEN_MODAL,
    message,
  }
);

const closeModal = () => (
  {
    type: CLOSE_MODAL,
  }
);

export const commonActions = {
  openModal,
  closeModal,
};

const initialState = {
  isShow: false,
  message: '',
};

const common = (state = initialState, action) => {
  if (action.type === OPEN_MODAL) {
    return {
      ...state,
      isShow: true,
      message: action.message,
    };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      isShow: false,
    };
  }

  return state;
};

export default common;
