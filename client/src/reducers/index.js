import { combineReducers } from 'redux';
import { HomeReducer } from './HomeReducer';
import { AuthReducer } from './AuthReducers';
import { ErrorReducer } from './ErrorReducers';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  homes: HomeReducer,
  form: FormReducer,
  auth:AuthReducer,
  errors: ErrorReducer,
  toastr: toastrReducer
})

export default rootReducer;