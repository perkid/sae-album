import { combineReducers } from 'redux';
import authentication from './authentication';
import friend from './friend';

export default combineReducers({
    //리듀서
    authentication, friend
    
});