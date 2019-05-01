import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios'
import setAuthToken from '../ultils/setAuthToken'
import jwt_decode from 'jwt-decode'
import { storage } from '../Firebase/config';
import {register} from '../ultils/validation'

//Register User
export const registerUser = (userData, router) => dispatch => {
    
    //Validate form fields
    const { valid, errors } = register({ ...userData });
    if (!valid) {
        return dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    }

    //Empty file upload
    if (userData.avatar === '') {
        userData.avatar = "./img/uploads/no-img.png";
        axios.post('/api/users/register', userData)
            .then(res => router.push('/login'))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            })
        return;
    }

    if (userData.avatar.size > 5 * 1024 * 1024) {
        const errors = {
            image: "Flie upload should be less than 5MB.",
            loading: false
        };
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
        return;
    }

    if (userData.avatar.type.match('image/.*')) {
        const upload = storage.ref(`avatars/${userData.avatar.name}`).put(userData.avatar)
        upload.on('state_changed',
            (snapshot) => { },
            (error) => {
                console.log(error);
                const errors = {
                    image: "Something went wrong, please upload a valid image file."
                };
                dispatch({
                    type: GET_ERRORS,
                    payload: errors
                })
            },
            () => {
                storage.ref('avatars').child(userData.avatar.name).getDownloadURL().then(url => {
                    userData.avatar = url;
                    axios.post('/api/users/register', userData)
                        .then(res => {
                            router.push('/login')
                        })
                        .catch(err => {
                            dispatch({
                                type: GET_ERRORS,
                                payload: err.response.data
                            })
                        })
                })
            })
    }else{
        const errors = {
            image: "Something went wrong, please upload a valid image file.",
            loading: false
        };
        return dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    }


}


//Login User
export const loginUser = (userData, router) => dispatch => {
    axios.post('/api/users/login', userData)
        .then(res => {
            //Save to localstorage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);

            //Set token to auth header
            setAuthToken(token);

            //decode token to get user data
            const decode = jwt_decode(token);

            //Set current user
            dispatch(setCurrentUser(decode));

            router.push('/blog')
        })
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