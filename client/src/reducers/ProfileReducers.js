import { 
  GET_HOME_BY_USER,
  HOME_LOADING,
  DELETE_HOME
} from '../constants/constants';

const initialState = {
  profileHomes: [],
  loading: false
}

export const ProfileReducer = (state=initialState, action)=>{
  switch(action.type){
    case HOME_LOADING:
      return{
        ...state,
        loading: true
      }
    case GET_HOME_BY_USER:
      return{
        ...state,
        profileHomes: action.payload,
        loading: false
      };

    case DELETE_HOME:
    return{
      ...state,
      profileHomes: state.profileHomes.filter(home=>home._id !== action.payload)
    };

    default:
      return state;
  }
}