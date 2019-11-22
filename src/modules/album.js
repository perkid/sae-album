import axios from 'axios';
import update from 'react-addons-update';

//알림 가져오기
const CREATE_GROUP = 'CREATE_GROUP';
const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';
const CREATE_GROUP_FAILURE = 'CREATE_GROUP_FAILURE';

// **** 액션 생섬함수 정의
export function createGroupRequest(name, owner, participants) {
    return (dispatch) => {
        // Inform Login API is starting
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

const initialState = {
//기본설정값
    groupCreate: {
        status: 'INIT',
        error: -1,
    }
    
};
// **** 리듀서 작성
export default function notification(state = initialState, action) {
    switch (action.type) {
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
            
        default:
            return state;
    }
};