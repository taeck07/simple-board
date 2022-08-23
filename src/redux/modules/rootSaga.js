import { all } from 'redux-saga/effects';
import { commentsSagas } from './comments';

export default function* rootSaga() {
  yield all([commentsSagas()]);
}
