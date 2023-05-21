import { combineReducers } from 'redux'
import userReducer from './userReducer.js'
import articleReducer from './articleReducer.js';
import messageReducer from './messageReducer.js';
import eventReducer from './eventReducer.js';

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    messageState: messageReducer,
    eventState: eventReducer,
}); 

export default rootReducer;