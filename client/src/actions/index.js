import { 
  ADD_HOME,
  GET_HOMES,
  GET_HOME,
  GET_HOME_BY_USER, 
  UPDATE_HOME, 
  DELETE_HOME,
  GOOGLELOGGEDIN, 
  GET_ERRORS,
  SEARCHED_HOMES, 
  SET_CURRENT_USER, 
  HOME_LOADING
} from '../constants/constants';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { toastr } from 'react-redux-toastr';

//**********************home actions***********************************

//add Home
export const addHome = (home)=>dispatch=>{
  axios.post('/api/posts', home)
  .then(res=>{
    toastr.success('Success!', 'new home added')
    dispatch({
    type: ADD_HOME,
    payload: res.data
  })
  })
  .catch(err=>console.log(err))
}

//get Homes
export const getHomes = ()=>dispatch=>{  
  dispatch(setHomeLoading());
  axios.get('/api/posts')
  .then(res=>{
    dispatch({
      type: GET_HOMES,
      payload: res.data
    })
  })
  .catch(err=>dispatch({
    type: GET_HOMES,
    payload: null
  }))
}

//get Home
export const getHome = (id)=>dispatch=>{
  dispatch(setHomeLoading());
  axios.get(`/api/posts/${id}`)
  .then(res=>dispatch({
    type: GET_HOME,
    payload: res.data
  }))
  .catch(err=> dispatch({
    type: GET_HOMES,
    payload: null
  }));
}

//get Home By user
export const getUserHome = ()=>dispatch=>{
  dispatch(setHomeLoading());
  axios.get('/api/profile')
  .then(res=>dispatch({
    type: GET_HOME_BY_USER,
    payload: res.data
  }))
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload: null
  }));
}


export const updateHome = (id, values)=>dispatch=>{
  dispatch(setHomeLoading());
  axios.put(`/api/profile/${id}`, values).then(res=> console.log('res', res) || dispatch({
    type: UPDATE_HOME,
    payload: res.data
  }))
  .catch(err=>console.log(err));
}

export const deleteHome = (id)=>dispatch=>{
  axios.delete(`/api/profile/${id}`).then(res=>{
    toastr.success('Success!', 'home deleted');
    dispatch({
      type: DELETE_HOME,
      payload: id
    })
  }).catch(err=>console.log(err))
}

export const searchedHomeByCity = (city)=>dispatch=>{
  axios.get(`/api/posts/place/${city}`).then(res=>dispatch({
    type: SEARCHED_HOMES,
    payload: res.data
  })).catch(err=>console.log(err))
}

export const setHomeLoading = ()=>{
  return{
    type: HOME_LOADING
  }
}

//****************auth actions***************************

//Register User
export const registerUser = (user, history)=>dispatch=>{
  axios.post('/api/users/register', user)
  .then(res=> {
    toastr.success('Success!', 'Successfully Registered');
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
    history.push('/login');
    }
  )    
  .catch(err=> console.log('err', err) ||dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  })); 
}

//Login-Get User Token
export const loginUser = (user, history)=>dispatch=>{
  axios.post('/api/users/login', user)
  .then(res=>{
    //Save to localStorage
    const {token} = res.data;
    localStorage.setItem('jwtToken', token);
    //Set token to Auth header
    setAuthToken(token);
    //Decode token to get user data
    const decoded = jwt_decode(token);
    //set current user
    dispatch(setCurrentUser(decoded));
    history.push('/');
  })
  .catch(err=>dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

//Set logged in User
export const setCurrentUser = decoded =>{
  return{
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

//Log user out
export const logoutUser = ()=>dispatch=>{
  //Remove token from localStorage
  localStorage.removeItem('jwtToken');
  //Remove auth header for future requests
  setAuthToken(false);
  //Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
}

/*************Log in with google *********************/
export const googleLoggedIn = ()=>dispatch=>{
  axios.get('/api/auth/verify').then(res=>dispatch({
    type: GOOGLELOGGEDIN,
    payload: res.data
  }))
}