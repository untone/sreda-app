import { put, takeLatest } from 'redux-saga/effects';
import { parseQuery } from '../api';

import {
  LOCATION_CHANGE,
  SET_NAME
} from './actions';

function* getQuery({payload}) {
  const {search} = parseQuery(payload.location.search);
  yield put({
    type: SET_NAME,
    name: search
  })
};

function* search() {
  yield takeLatest(LOCATION_CHANGE, getQuery);
}

export default search;
