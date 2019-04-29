import {combineReducers} from 'redux'
import authReducer from './auth_reducers'
import errorReducer from './errors_reducers'



export default combineReducers({
    auth: authReducer,
    errors: errorReducer
}) 