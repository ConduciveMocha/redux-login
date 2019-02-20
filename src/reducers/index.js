import {combineReducers} from 'redux'
import registrationReducer from './registration-reuducer'
import loginReducer from './login-reducer'


export default combineReducers({loginReducer,registrationReducer})