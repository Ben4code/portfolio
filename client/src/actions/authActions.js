import {GET_ERRORS, SET_CURRENT_USER} from './types';
import axios from 'axios'
import setAuthToken from '../ultils/setAuthToken'
import jwt_decode from 'jwt-decode'


//Register User
export const registerUser = (userData, router) => dispatch =>{    
    const fd = new FormData();
    fd.append('name', userData.name);
    fd.append('email', userData.email);
    fd.append('password', userData.password);
    fd.append('confirmPassword', userData.confirmPassword);
    fd.append('avatar', userData.avatar,  userData.avatar.name);
    
    axios.post('/api/users/register', fd)
    .then(res => router.push('/login') )
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) 
    })  
}


//Login User
export const loginUser = (userData, router) => dispatch =>{    
    axios.post('/api/users/login', userData)
    .then(res => {
        //Save to localstorage
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        
        //Set token to auth header
        setAuthToken(token);

        //decode token to get user data
        const decode = jwt_decode(token);

        //Set current user
        dispatch(setCurrentUser(decode));

        router.push('/blog')
    } )
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }) 
    })  
}

//Set Current User
export const setCurrentUser = (decode) => {
    return {
        type: SET_CURRENT_USER,
        payload: decode
    }
}

//Logout user
export const logOut = (router) => (dispatch) => {
    //Remove token from localstorage
    localStorage.removeItem('jwtToken');
    
    //Remove auth header
    setAuthToken(false);

    //Set isAuth to empty object
    dispatch(setCurrentUser({}));

    router.push('/')
}