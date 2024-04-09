import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { PERSIST, persistReducer, persistStore, PURGE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  blacklist: [],
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);
const middleWare = [thunk];
const store = createStore(persistedReducer, {}, applyMiddleware(...middleWare));
const persistor = persistStore(store);
export { store, persistor };
