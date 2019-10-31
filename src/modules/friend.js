import axios from 'axios';
import update from 'react-addons-update';

// 친구요청
const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
const ADD_FRIEND_REQUEST_SUCCESS = 'ADD_FRIEND_REQUEST_SUCCESS';
const ADD_FRIEND_REQUEST_FAILURE = 'ADD_FRIEND_REQUEST_FAILURE';

// **** 액션 생섬함수 정의
export function addFriendRequest(sender, reciver) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(addFriend());

        // API REQUEST
        return axios.post('/api/friend/request', { sender, reciver })
        .then((response) => {
            // SUCCEED
            dispatch(addFriendSuccess());
        }).catch((error) => {
            // FAILED
            dispatch(addFriendFailure());
        });
    };
}

export const addFriend = () => ({type: ADD_FRIEND_REQUEST});

export const addFriendSuccess = () =>({ type: ADD_FRIEND_REQUEST_SUCCESS  });

export const addFriendFailure = () => ({type: ADD_FRIEND_REQUEST_FAILURE});

const initialState = {
    
};
// **** 리듀서 작성
export default function friend(state = initialState, action) {
    switch (action.type) {
        case ADD_FRIEND_REQUEST:
            return update(state, {
            });
        case ADD_FRIEND_REQUEST_SUCCESS:
            return update(state, {

            });
        case ADD_FRIEND_REQUEST_FAILURE:
            return update(state, {
            });
        default:
            return state;
    }
};