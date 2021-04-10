import { commonActions } from './commonReducer';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_MENU = 'SET_MENU';

const setUserInfo = (userId) => (
  {
    type: SET_USER_INFO,
    userId,
  }
);

const setMenu = (isGuest) => (
  {
    type: SET_MENU,
    isGuest,
  }
);

export const actions = {
  ...commonActions,
  setUserInfo,
  setMenu,
};

const initialState = {
  userName: 'No Login',
  userId: '',
  menu: [],
  guestMenu: [
    {
      linkText: 'Login',
      linkUrl: '/login',
    },
  ],
  loginMenu: [
    {
      linkText: 'MyPage',
      linkUrl: '/mypage',
    },
    {
      linkText: 'Logout',
      linkUrl: '/logout',
    },
  ],
};

const userState = (state = initialState, action) => {
  if (action.type === SET_USER_INFO) {
    return {
      ...state,
      userId: action.userId,
    };
  }
  if (action.type === SET_MENU) {
    return {
      ...state,
      menu: action.isGuest ? state.guestMenu : state.loginMenu,
    };
  }

  return state;
};

export default userState;
