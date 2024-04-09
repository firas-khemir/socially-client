import { combineReducers } from 'redux';
import authReducer from './authReducer';
import globalReducer from './globalReducer';
import theme from './themeReducer';

const reducers = combineReducers({
  auth: authReducer,
  global: globalReducer,
  theme
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
