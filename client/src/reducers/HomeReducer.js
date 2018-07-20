import { ADD_HOME, UPDATE_HOME, DELETE_HOME, GET_HOMES } from '../constants/constants';

const initialState = {
  homes: [],
  home: {},
  loading: false
}

export const HomeReducer = (state=initialState, action)=>{
  switch(action.type){
    case ADD_HOME:
      return{
        ...state,
        homes:[action.payload, ...state.homes]
      };
    case GET_HOMES:
      return{
        ...state,
        homes: action.payload,
        loading: false
      }
    case UPDATE_HOME:
      return[...state.filter(home=>home.id !== action.payload.id), Object.assign({}, action.payload)];

    case DELETE_HOME:
      return[...state.filter(home=>home.id !== action.payload)];

    default:
      return state;
  }
}