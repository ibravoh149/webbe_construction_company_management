import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import Navigation from './navigation';
import {store, persistor} from './redux/Store';
import useColorScheme from './Hooks/useColorScheme';
import * as React from 'react';
import useCachedResources from './Hooks/useCachedResources';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (!isLoadingComplete) return null;
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar
              backgroundColor={'transparent'}
              translucent
              barStyle={'dark-content'}
            />
          </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
  // }
}
