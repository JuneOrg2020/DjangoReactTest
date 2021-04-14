import {
  call,
  put,
  take,
  delay,
  fork,
} from 'redux-saga/effects';
import { actions, actionTypes } from '../reducers/inputDataReducer';
import { inputSearch } from '../modules/inputSearch';

function* runSearch(text) {
  const data = yield call(inputSearch, text);

  if (data && data.length > 0) {
    yield put(actions.updateResult(data));
  }
}

function forkLater(task, ...args) {
  return fork(function* () {
    yield delay(1000);
    yield fork(task, ...args);
  });
}

function* handleRequest() {
  let task;
  while (true) {
    const { text } = yield take(actionTypes.SET_TEXT);
    if (task && task.isRunning()) {
      task.cancel();
    }
    task = yield forkLater(runSearch, text);
  }
}

function* rootSaga() {
  yield fork(handleRequest);
}

export default rootSaga;
