import {
  FETCH_LICENSES_SUCCEEDED,
  FETCH_LICENSES_FAILED,
  FETCH_REPOS_STARTED,
  FETCH_REPOS_SUCCEEDED,
  FETCH_REPOS_FAILURE,
  SET_QUERY
} from './actions';

const monthAgo = () => {
  let date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date;
};

const initialState = {
  date: monthAgo(),
  license: '',
  licenses: [],
  items: [],
  inited: false,
  loading: false,
  message: '',
  search: '',
  page: 1,
  total: 0
};

const repos = (state = initialState, action) => {
  const {
    items,
    message,
    licenses,
    payload,
    type,
    total_count
  } = action;
  switch (type) {
    case FETCH_LICENSES_SUCCEEDED:
      sessionStorage.setItem('licenses', JSON.stringify(licenses));
      return {
        ...state,
        licenses: [{key: 'all', spdx_id: 'All'}, ...licenses]
      };
    case FETCH_REPOS_STARTED:
      return {
        ...state,
        loading: true,
      };
    case FETCH_REPOS_SUCCEEDED:
      return {
        ...state,
        items,
        total: total_count,
        loading: false,
      };
    case FETCH_LICENSES_FAILED:
    case FETCH_REPOS_FAILURE:
      return {
        ...state,
        loading: false,
        message
      };
    case SET_QUERY:
      return {
        ...state,
        search: payload.search,
        license: payload.license === 'all' ? '' : payload.license || state.license,
        page: payload.page || state.page
      };
    default:
      return state;
  }
};

export default repos;
