import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage
} from 'redux-persist';
import { MMKV } from 'react-native-mmkv';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import theme from './reducers/themeReducer';

// const reducers = combineReducers({
//   theme,
//   [api.reducerPath]: api.reducer
// });

const storage = new MMKV();
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  }
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['theme', 'auth']
};

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => {
//     const middlewares = getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//       }
//     }).concat(api.middleware);

//     if (__DEV__ && !process.env.JEST_WORKER_ID) {
//       const createDebugger = require('redux-flipper').default;
//       middlewares.push(createDebugger());
//     }

//     return middlewares;
//   }
// });

const persistedReducer = persistReducer(persistConfig, reducers);
const middleWare = [thunk];
const store = createStore(persistedReducer, {}, applyMiddleware(...middleWare));
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
