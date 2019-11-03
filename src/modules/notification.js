import axios from 'axios';
import update from 'react-addons-update';

//알림 가져오기
const GET_NOTIFICATIONS = 'GET_NOTIFICATION';
const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATION_SUCCESS';
const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATION_FAILURE';

// **** 액션 생섬함수 정의
export function getNotificationsRequest(username) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(getNotifications());

        // API REQUEST
        return axios.post('/api/notification/get', { username })
        .then((response) => {
            // SUCCEED
            let notice = response.data.notice
            dispatch(getNotificationsSuccess(notice));
        }).catch((error) => {
            // FAILED
            dispatch(getNotificationsFailure());
        });
    };
}

export const getNotifications = () => ({ type: GET_NOTIFICATIONS });

export const getNotificationsSuccess = (notice) =>({ type: GET_NOTIFICATIONS_SUCCESS, notice });

export const getNotificationsFailure = () => ({ type: GET_NOTIFICATIONS_FAILURE });

const initialState = {
//기본설정값
    notice: {
        status: 'INIT',
        list: [],
        error: -1,
    }
    
};
// **** 리듀서 작성
export default function notification(state = initialState, action) {
    switch (action.type) {
        case GET_NOTIFICATIONS:
            return update(state, {
                notice: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
            case GET_NOTIFICATIONS_SUCCESS:
                return update(state, {
                notice: {
                    status: { $set: 'SUCCESS' },
                    list : {
                        $set: action.notice
                    }
                }
            });
        case GET_NOTIFICATIONS_FAILURE:
            return update(state, {
                notice: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
            
        default:
            return state;
    }
};