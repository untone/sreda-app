import {
  FETCH_LICENSES_SUCCEEDED,
  FETCH_LICENSES_FAILED,
  FETCH_REPOS_STARTED,
  FETCH_REPOS_SUCCEEDED,
  FETCH_REPOS_FAILURE,
  SET_NAME,
  SET_LICENSE,
  SET_PAGE,
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
  name: '',
  page: 1,
  total: 0
};

const repos = (
  state = initialState,
  {
    items,
    message,
    name,
    license,
    licenses,
    page,
    type,
    total_count
  }) => {
  switch (type) {
    case FETCH_LICENSES_SUCCEEDED:
      return {
        ...state,
        licenses
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
    case SET_LICENSE:
      return {
        ...state,
        license
      };
    case SET_NAME:
      return {
        ...state,
        name
      };
    case SET_PAGE:
      return {
        ...state,
        page
      };
    default:
      return state;
  }
};

export default repos;
