import { spawn } from 'redux-saga/effects';

import repos from './repos/sagas';

function* root() {
  yield spawn(repos);
}

export default root;
