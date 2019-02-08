import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import MyChannel from './MyChannel';
import { ConfigureStore } from './redux/configureStore';

const { persistor, store } = ConfigureStore();

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
        >
          <MyChannel />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
