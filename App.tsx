import React from 'react';
import {Provider} from 'react-redux';
import store from './src/store';
import Router from './src/router';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
