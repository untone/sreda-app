import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import LoadingBar from 'react-redux-loading-bar';
import { configureStore, history } from './store';

import ReposContainer from './repos/ReposContainer';
const store = configureStore();

const style = {
  top: 0,
  zIndex: 2,
  backgroundColor: '#0080ff',
  height: '5px'
};

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LoadingBar style={style}/>
      <Switch>
        <Route path='/' component={ReposContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default App;
