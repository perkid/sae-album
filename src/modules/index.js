import { combineReducers } from 'redux';
import authentication from './authentication';
import friend from './friend';
import notification from './notification';

export default combineReducers({
    //리듀서
    authentication, friend, notification
    
});