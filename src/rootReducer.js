import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import repos from './repos/store';
import search from './search/store';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    repos,
    search,
    loadingBar: loadingBarReducer,
  });

export default rootReducer;
