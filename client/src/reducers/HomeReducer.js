import { ADD_HOME, UPDATE_HOME, DELETE_HOME } from '../constants/constants';


export const HomeReducer = (state=[], action)=>{
  switch(action.type){
    case ADD_HOME:
      return[
        ...state, action.payload
      ];
    case UPDATE_HOME:
      return[...state.filter(home=>home.id !== action.payload.id), Object.assign({}, action.payload)];

    case DELETE_HOME:
      return[...state.filter(home=>home.id !== action.payload)];

    default:
      return state;
  }
}