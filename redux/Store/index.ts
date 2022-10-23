// import {legacy_createStore, applyMiddleware} from"redux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
// import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import RootReducer from '../Slices/';
import {configureStore} from '@reduxjs/toolkit';

const persistConfig = {
  key: 'webbee_machine_management',
  version: 0,
  storage: AsyncStorage,
  stateReconsiler: autoMergeLevel2,
  // blacklist: ["Machine"],
};

const appReducer = persistReducer(persistConfig, RootReducer);
const store = configureStore({
  reducer: appReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const persistor = persistStore(store);
export {store, persistor};
