import { combineReducers } from 'redux';
import { HomeReducer } from './HomeReducer';
import { AuthReducer } from './AuthReducers';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  homes: HomeReducer,
  form: FormReducer,
  auth:AuthReducer
})

export default rootReducer;