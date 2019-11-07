import axios from 'axios';
import update from 'react-addons-update';

// 친구요청
const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
const ADD_FRIEND_REQUEST_SUCCESS = 'ADD_FRIEND_REQUEST_SUCCESS';
const ADD_FRIEND_REQUEST_FAILURE = 'ADD_FRIEND_REQUEST_FAILURE';

// 친구 요청 보낸 리스트리스트
const GET_FRIENDS_REQUEST_LIST = 'GET_FRIENDS_REQUEST_LIST';
const GET_FRIENDS_REQUEST_LIST_SUCCESS = 'GET_FRIENDS_REQUEST_LIST_SUCCESS';
const GET_FRIENDS_REQUEST_LIST_FAILURE = 'GET_FRIENDS_REQUEST_LIST_FAILURE';

// 친구 거절
const REFUSE_FRIEND_REQUEST = 'REFUSE_FRIEND_REQUEST';
const REFUSE_FRIEND_REQUEST_SUCCESS = 'REFUSE_FRIEND_REQUEST_SUCCESS';
const REFUSE_FRIEND_REQUEST_FAILURE = 'REFUSE_FRIEND_REQUEST_FAILURE';

// 친구 요청 수락

const ALLOW_FRIEND_REQUEST = 'ALLOW_FRIEND_REQUEST';
const ALLOW_FRIEND_REQUEST_SUCCESS = 'ALLOW_FRIEND_REQUEST_SUCCESS';
const ALLOW_FRIEND_REQUEST_FAILURE = 'ALLOW_FRIEND_REQUEST_FAILURE';

// 친구 리스트

const GET_FRIENDS_LIST = "GET_FRIENDS_LIST";
const GET_FRIENDS_LIST_SUCCESS = "GET_FRIENDS_LIST_SUCCESS";
const GET_FRIENDS_LIST_FAILURE = "GET_FRIENDS_LIST_FAILURE";

//친구요청
export function addFriendRequest(sender, receiver) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(addFriend());

        // API REQUEST
        return axios.post('/api/friend/request', { sender, receiver })
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

//친구 요청 보낸 리스트
export function getFriendsRequest(username) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getFriends());

        // API REQUEST
        return axios.post('/api/friend/request/list', { username })
        .then((response) => {
            // SUCCEED
            let list = response.data.list;
            dispatch(getFriendsSuccess(list));
        }).catch((error) => {
            // FAILED
            dispatch(getFriendsFailure());
        });
    };
}

export const getFriends = () => ({type: GET_FRIENDS_REQUEST_LIST});

export const getFriendsSuccess = (list) =>({ type: GET_FRIENDS_REQUEST_LIST_SUCCESS, list });

export const getFriendsFailure = () => ({type: GET_FRIENDS_REQUEST_LIST_FAILURE});

//친구 요청 거절
export function refuseRequest(sender, receiver) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(refuseFriend());

        // API REQUEST
        return axios.post('/api/friend/refuse', { sender, receiver })
        .then((response) => {
            // SUCCEED
            dispatch(refuseFriendSuccess());
        }).catch((error) => {
            // FAILED
            dispatch(refuseFriendFailure());
        });
    };
}

export const refuseFriend = () => ({type: REFUSE_FRIEND_REQUEST});

export const refuseFriendSuccess = () =>({ type: REFUSE_FRIEND_REQUEST_SUCCESS  });

export const refuseFriendFailure = () => ({type: REFUSE_FRIEND_REQUEST_FAILURE});

//친구 요청 수락
export function allowRequest(sender, receiver) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(allowFriend());

        // API REQUEST
        return axios.post('/api/friend/allow', { sender, receiver })
        .then((response) => {
            // SUCCEED
            dispatch(allowFriendSuccess());
        }).catch((error) => {
            // FAILED
            dispatch(allowFriendFailure());
        });
    };
}

export const allowFriend = () => ({type: ALLOW_FRIEND_REQUEST});

export const allowFriendSuccess = () =>({ type: ALLOW_FRIEND_REQUEST_SUCCESS  });

export const allowFriendFailure = () => ({type: ALLOW_FRIEND_REQUEST_FAILURE});

//친구 리스트

export function getFriendsListRequest(username) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getFriendsList());

        // API REQUEST
        return axios.post('/api/friend/list', { username })
        .then((response) => {
            // SUCCEED
            let list = response.data.list;
            dispatch(getFriendsListSuccess(list));
        }).catch((error) => {
            // FAILED
            dispatch(getFriendsListFailure());
        });
    };
}

export const getFriendsList = () => ({type: GET_FRIENDS_LIST});

export const getFriendsListSuccess = (list) =>({ type: GET_FRIENDS_LIST_SUCCESS, list });

export const getFriendsListFailure = () => ({type: GET_FRIENDS_LIST_FAILURE});

const initialState = {
    addFriend: {
        status: 'INIT',
        error: -1
    },
    getFriends: {
        status: 'INIT',
        error: -1,
        list: []
    },
    refuseRequest: {
        status: 'INIT',
        error: -1
    },
    allowRequest: {
        status: 'INIT',
        error: -1
    },
    friendsList: {
        status: 'INIT',
        error: -1,
        list: []
    }
};
// **** 리듀서 작성
export default function friend(state = initialState, action) {
    switch (action.type) {
        case ADD_FRIEND_REQUEST:
            return update(state, {
                addFriend: {
                    status: { $set: 'WAITING' }
                }
            });
        case ADD_FRIEND_REQUEST_SUCCESS:
            return update(state, {
                addFriend: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case ADD_FRIEND_REQUEST_FAILURE:
            return update(state, {
                addFriend: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
            });
        case GET_FRIENDS_REQUEST_LIST:
            return update(state, {
                getFriends: {
                    status: { $set: 'WAITING' }
                }
            });
        case GET_FRIENDS_REQUEST_LIST_SUCCESS:
            return update(state, {
                getFriends: {
                    status: { $set: 'SUCCESS' },
                    list: { $set: action.list }
                }
            });
        case GET_FRIENDS_REQUEST_LIST_FAILURE:
            return update(state, {
                getFriends: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
            });
        //친구 요청 거절
        case REFUSE_FRIEND_REQUEST:
            return update(state, {
                refuseRequest: {
                    status: { $set: 'WAITING' }
                }
            });
        case REFUSE_FRIEND_REQUEST_SUCCESS:
            return update(state, {
                refuseRequest: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case REFUSE_FRIEND_REQUEST_FAILURE:
            return update(state, {
                refuseRequest: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
            });
        //친구 요청 수락
        case ALLOW_FRIEND_REQUEST:
            return update(state, {
                allowRequest: {
                    status: { $set: 'WAITING' }
                }
            });
        case ALLOW_FRIEND_REQUEST_SUCCESS:
            return update(state, {
                allowRequest: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case ALLOW_FRIEND_REQUEST_FAILURE:
            return update(state, {
                allowRequest: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
            });
        // 친구 리스트
        case GET_FRIENDS_LIST:
            return update(state, {
                friendsList: {
                    status: { $set: 'WAITING' }
                }
            });
        case GET_FRIENDS_LIST_SUCCESS:
            return update(state, {
                friendsList: {
                    status: { $set: 'SUCCESS' },
                    list: { $set: action.list }
                }
            });
        case GET_FRIENDS_LIST_FAILURE:
            return update(state, {
                friendsList: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
            });
        default:
            return state;
    }
};