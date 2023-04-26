import { combineReducers } from 'redux'
import userReducer from './userReducer.js'

const rootReducer = combineReducers({
    userState: userReducer,
}); 

export default rootReducer;