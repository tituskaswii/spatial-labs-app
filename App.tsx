import RootNavigator from '@routes';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import store from 'store';

let persistor = persistStore(store);
let NativeDevSettings;

LogBox.ignoreAllLogs();

const App = () => {
  const connectToRemoteDebugger = () => {
    if (__DEV__) {
      NativeDevSettings =
        require('react-native/Libraries/NativeModules/specs/NativeDevSettings').default;
      NativeDevSettings.setIsDebuggingRemotely(true);
    }
  };

  useEffect(() => {
    connectToRemoteDebugger();
  }, []);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigator />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
