import { call, put, select, takeLatest } from 'redux-saga/effects';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { fetchLicenses, fetchRepos, parseQuery } from '../api';
import {
  FETCH_LICENSES_STARTED,
  FETCH_LICENSES_SUCCEEDED,
  FETCH_LICENSES_FAILED,
  FETCH_REPOS_STARTED,
  FETCH_REPOS_SUCCEEDED,
  FETCH_REPOS_FAILURE,
  LOCATION_CHANGE,
  SET_NAME,
  SET_LICENSE,
  SET_PAGE
} from './actions';

const getState = (state, key) => state[key];

function* getLicenses() {
  const {licenses} = yield select(getState, 'repos');
  if (!licenses.length) {
    yield put({
      type: FETCH_LICENSES_STARTED
    });
    try {
      const licenses = yield call(fetchLicenses);
      yield put({
        type: FETCH_LICENSES_SUCCEEDED,
        licenses
      });
    } catch (e) {
      yield put({
        type: FETCH_LICENSES_FAILED,
        message: e.message,
      });
    }
  }
};

function* getQuery({payload}) {
  const {search, page} = parseQuery(payload.location.search);
  yield put({
    type: SET_NAME,
    name: search,
    page
  });
};

function* getRepos({ payload }) {
  yield put({
    type: FETCH_REPOS_STARTED
  });
  const {date, license, name, page} = yield select(getState, 'repos');
  yield put(showLoading());
  try {
    const {items, total_count} = yield call(fetchRepos, {
      date, license, name, page
    });
    yield put({
      type: FETCH_REPOS_SUCCEEDED,
      items,
      total_count
    });
  } catch (e) {
    yield put({
      type: FETCH_REPOS_FAILURE,
      message: e.message,
    });
  } finally {
    yield put(hideLoading());
  }
};

function* repos() {
  yield takeLatest(LOCATION_CHANGE, getQuery);
  yield takeLatest([SET_NAME, SET_LICENSE], getRepos);
  yield takeLatest(SET_NAME, getLicenses);
}

export default repos;
