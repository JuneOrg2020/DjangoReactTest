import { combineReducers } from 'redux';
import inputData from './inputDataReducer';
import search from './searchReducer';
import userState from './userStateReducer';
import mapView from './mapViewReducer';
import linkedInfo from './linkedInfoReducer';
import linker from './linkerReducer';
import linkerData from './linkerDataReducer';
import infoEdit from './infoEditReducer';
import linkerEdit from './linkerEditReducer';
import myPage from './myPageReducer';
import common from './commonReducer';

const reducer = combineReducers({
  userState,
  inputData,
  search,
  mapView,
  myPage,
  linkedInfo,
  linkerData,
  linkerEdit,
  infoEdit,
  linker,
  common,
});

export default reducer;
