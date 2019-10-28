/**
 *
 * @format
 * @flow
*/

import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './Routes';

import { Provider } from 'react-redux';
import configureStore from './store';

const store = configureStore();

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor="#222222" barStyle="light-content" />
        <Routes />
      </Provider>
    )
  }
}

export default App;