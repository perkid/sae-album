import { combineReducers } from 'redux';
import authentication from './authentication';
import friend from './friend';
import notification from './notification';
import album from './album';

export default combineReducers({
    //리듀서
    authentication, friend, notification , album
    
});