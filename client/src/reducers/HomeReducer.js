import { 
  ADD_HOME, 
  GET_HOMES, 
  GET_HOME,
  SEARCHED_HOMES,
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
      };
    case SEARCHED_HOMES:
    return{
      ...state,
      homes: action.payload,
      loading: false
    }


    default:
      return state;
  }
}