import { spawn } from 'redux-saga/effects';

import repos from './repos/sagas';
import search from './search/sagas';

function* root() {
  yield spawn(repos);
  yield spawn(search);
}

export default root;
