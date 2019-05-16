import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { loadingBarReducer } from 'react-redux-loading-bar';

import repos from './repos/store';

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    repos,
    loadingBar: loadingBarReducer,
  });

export default rootReducer;
