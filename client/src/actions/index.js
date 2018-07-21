import { 
  ADD_HOME,
  GET_HOMES,
  GET_HOME, 
  UPDATE_HOME, 
  DELETE_HOME, 
  GET_ERRORS, 
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
  .then(res=>dispatch({
    type: ADD_HOME,
    payload: res.data
  }))
  .catch(err=>console.log(err))
}

//get Homes
export const getHomes = ()=>dispatch=>{
  dispatch(setHomeLoading());
  axios.get('/api/posts')
  .then(res=>dispatch({
    type: GET_HOMES,
    payload: res.data
  }))
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
    type: GET_ERRORS,
    payload: err.response.data
  }));
}

export const updateHome = (home)=>{
  return{
    type: UPDATE_HOME,
    payload: home
  }
}

export const deleteHome = (homeId)=>{
  return{
    type: DELETE_HOME,
    payload: homeId
  }
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
  .then(res=> {toastr.success('Success!', 'Successfully Registered');
    history.push('/login');
    }
  )    
  .catch(err=> dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }));
  return {type: GET_ERRORS, payload: user} 
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