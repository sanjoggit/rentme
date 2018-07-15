import { SET_CURRENT_USER } from '../constants/constants';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export const AuthReducer = (state=initialState, action)=>{
  switch(action.type){
    case SET_CURRENT_USER:
      return{ 
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    default:
      return state;
  }
}