import { ADD_HOME, UPDATE_HOME, DELETE_HOME, REGISTER_USER, SET_CURRENT_USER } from '../constants/constants';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

//home actions
export const addHome = (home)=>{
  return{
    type: ADD_HOME,
    payload: home
  }
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

//auth actions

//Register User
export const registerUser = (user)=>dispatch=>{
  axios.post('/api/users/register', user)
  .then(res=>dispatch({
    type: REGISTER_USER,
    payload: user
  }))
  .catch(err=>console.log(err)); 
}

//Login-Get User Token
export const loginUser = (user)=>dispatch=>{
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
  })
  .catch(err=>console.log(err));
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