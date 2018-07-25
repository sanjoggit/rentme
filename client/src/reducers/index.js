import { combineReducers } from 'redux';
import { HomeReducer } from './HomeReducer';
import { AuthReducer } from './AuthReducers';
import { ProfileReducer } from './ProfileReducers';
import { ErrorReducer } from './ErrorReducers';
import { reducer as FormReducer } from 'redux-form';
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  homes: HomeReducer,
  form: FormReducer,
  auth:AuthReducer,
  profile: ProfileReducer,
  errors: ErrorReducer,
  toastr: toastrReducer
})

export default rootReducer;