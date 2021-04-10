import { commonActions } from './commonReducer';

export const STOCK_INFO = 'STOCK_INFO';

const stockInfo = (stockState) => (
  {
    type: STOCK_INFO,
    stockState,
  }
);

export const actions = {
  ...commonActions,
  stockInfo,
};

const initialState = {
  isShowLinker: true,
  selectedInfo: {
    id: -1,
    userId: 1,
    isStocked: true,
    isEditable: false,
    text: 'Main Selected Text AAA.',
  },
};

const mapView = (state = initialState, action) => {
  if (action.type === STOCK_INFO) {
    const updateLinkInfos = state.linkInfos.slice();
    updateLinkInfos[action.groupId].isShowOthers = !updateLinkInfos[action.groupId].isShowOthers;

    return {
      ...state,
      linkInfos: updateLinkInfos,
    };
  }

  return state;
};

export default mapView;
