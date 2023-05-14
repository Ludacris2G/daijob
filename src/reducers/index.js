import { combineReducers } from 'redux'
import userReducer from './userReducer.js'
import articleReducer from './articleReducer.js';
import messageReducer from './messageReducer.js';

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    messageState: messageReducer,
}); 

export default rootReducer;