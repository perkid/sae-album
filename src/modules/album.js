import axios from 'axios';
import update from 'react-addons-update';

//그룹 생성
const CREATE_GROUP = 'CREATE_GROUP';
const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';

//그룹 리스트 가져오기
const GET_GROUP_LIST = 'GET_GROUP_LIST';
const GET_GROUP_LIST_SUCCESS = 'GET_GROUP_LIST_SUCCESS';
const GET_GROUP_LIST_FAILURE = 'GET_GROUP_LIST_FAILURE';

export function createGroupRequest(name, owner, participants) {
    return (dispatch) => {
        dispatch(createGroup());

        // API REQUEST
        return axios.post('/api/album/group/create', { name, owner, participants })
        .then((response) => {
            // SUCCEES
            dispatch(createGroupSuccess());
        }).catch((error) => {
            // FAILED
            dispatch(createGroupFailure());
        });
    };
}

export const createGroup = () => ({ type: CREATE_GROUP });

export const createGroupSuccess = () =>({ type: CREATE_GROUP_SUCCESS });

export const createGroupFailure = () => ({ type: CREATE_GROUP_FAILURE });

export function getGroupRequest(username) {
    return (dispatch) => {
        dispatch(getGroup());

        // API REQUEST
        return axios.post('/api/album/group/list/get', {username})
        .then((response) => {
            // SUCCEES
            let list = response.data.list
            dispatch(getGroupSuccess(list));
        }).catch((error) => {
            // FAILED
            dispatch(getGroupFailure());
        });
    };
}

export const getGroup = () => ({ type: GET_GROUP_LIST });

export const getGroupSuccess = (list) =>({ type: GET_GROUP_LIST_SUCCESS, list });

export const getGroupFailure = () => ({ type: GET_GROUP_LIST_FAILURE });

const initialState = {
//기본설정값
    groupCreate: {
        status: 'INIT',
        error: -1,
    },
    getGroup: {
        status: 'INIT',
        error: -1,
        list: []
    }
    
};
// **** 리듀서 작성
export default function album(state = initialState, action) {
    switch (action.type) {
        //그룹생성
        case CREATE_GROUP:
            return update(state, {
                groupCreate: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
            case CREATE_GROUP_SUCCESS:
                return update(state, {
                groupCreate: {
                    status: { $set: 'SUCCESS' },
                }
            });
        case CREATE_GROUP_FAILURE:
            return update(state, {
                groupCreate: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        // 그룹리스트 요청
        case GET_GROUP_LIST:
            return update(state, {
                getGroup: {
                    status: { $set: 'WAITING' },
                }
            });
            case GET_GROUP_LIST_SUCCESS:
                return update(state, {
                getGroup: {
                    status: { $set: 'SUCCESS' },
                    list: { $set: action.list}
                }
            });
        case GET_GROUP_LIST_FAILURE:
            return update(state, {
                getGroup: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
            
        default:
            return state;
    }
};