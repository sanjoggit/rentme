import { 
  ADD_HOME, 
  UPDATE_HOME, 
  DELETE_HOME, 
  GET_HOMES, 
  GET_HOME,
  HOME_LOADING
} from '../constants/constants';

const initialState = {
  homes: [],
  home: {},
  loading: false
}

export const HomeReducer = (state=initialState, action)=>{
  switch(action.type){
    case HOME_LOADING:
      return{
        ...state,
        loading: true
      }
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
      };
    case GET_HOME:
      return{
        ...state,
        home: action.payload,
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