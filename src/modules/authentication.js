// 액션 타입 정의
import axios from 'axios';
import update from 'react-addons-update';

/* AUTHENTICATION */

//로그인
export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";

//회원가입
export const AUTH_REGISTER = "AUTH_REGISTER";
export const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
export const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";

//로그인상태
export const AUTH_GET_STATUS = "AUTH_GET_STATUS";
export const AUTH_GET_STATUS_SUCCESS = "AUTH_GET_STATUS_SUCCESS";
export const AUTH_GET_STATUS_FAILURE = "AUTH_GET_STATUS_FAILURE";

//비밀번호 변경
export const AUTH_CHANGE_PASSWORD = "AUTH_CHANGE_PASSWORD";
export const AUTH_CHANGE_PASSWORD_SUCCESS = "AUTH_CHANGE_PASSWORD_SUCCESS";
export const AUTH_CHANGE_PASSWORD_FAILURE = "AUTH_CHANGE_PASSWORD_FAILURE";

//프로필 변경
export const CHANGE_PROFILE = "CHANGE_PROFILE";
export const CHANGE_PROFILE_SUCCESS = "CHANGE_PROFILE_SUCCESS";
export const CHANGE_PROFILE_FAILURE = "CHANGE_PROFILE_FAILURE";

//프로필 사진 변경

export const CHANGE_PROFILE_IMG = "CHANGE_PROFILE_IMG";
export const CHANGE_PROFILE_IMG_SUCCESS = "CHANGE_PROFILE_IMG_SUCCESS";
export const CHANGE_PROFILE_IMG_FAILURE = "CHANGE_PROFILE_IMG_FAILURE";

//프로필 사진 삭제

export const DELETE_PROFILE_IMG = "DELETE_PROFILE_IMG";
export const DELETE_PROFILE_IMG_SUCCESS = "DELETE_PROFILE_IMG_SUCCESS";
export const DELETE_PROFILE_IMG_FAILURE = "DELETE_PROFILE_IMG_FAILURE";

//로그아웃
export const AUTH_LOGOUT = "AUTH_LOGOUT";

//Ducks 패턴을 사용할 땐 액션 이름을 지을 때 문자열의 앞부분에 모듈 이름을 넣습니다.

// **** 액션 생섬함수 정의
export function loginRequest(email, password) {
    return (dispatch) => {
        // Inform Login API is starting
        dispatch(login());

        // API REQUEST
        return axios.post('/api/account/signin', { email, password })
        .then((response) => {
            // SUCCEED
            let account = response.data.account;
            dispatch(loginSuccess(account));
        }).catch((error) => {
            // FAILED
            dispatch(loginFailure());
        });
    };
}

export const login = () => ({type: AUTH_LOGIN});

export const loginSuccess = (account) =>({ type: AUTH_LOGIN_SUCCESS, account });

export const loginFailure = () => ({type: AUTH_LOGIN_FAILURE});

/* REGISTER */
export function registerRequest(email, username, name, password) {
    return (dispatch) => {
        // Inform Register API is starting
        dispatch(register());

        return axios.post('/api/account/signup', { email, username, name, password })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.code));
        });
    };
}

export const register = () => ({ type: AUTH_REGISTER });

export const registerSuccess = () => ({ type: AUTH_REGISTER_SUCCESS });

export const registerFailure = (error) => ({ type: AUTH_REGISTER_FAILURE, error });

/* CHANGE PASSWORD */
export function changePassRequest(email, password, newPassword1, newPassword2){
    return (dispatch) => {
        // Inform Change Password API is starting
        dispatch(changePass());

        // API REQUEST
        return axios.put('/api/account/password/change', { email, password, newPassword1, newPassword2})
        .then((response) => {
            //SUCCEED
            dispatch(changePassSuccess());
            //FAILED
        }).catch((error) => {
            dispatch(changePassFailure(error.response.data.code));
        });
    };
}

export const changePass = () => ({ type: AUTH_CHANGE_PASSWORD });

export const changePassSuccess = () => ({ type : AUTH_CHANGE_PASSWORD_SUCCESS });

export const changePassFailure = () => ({ type : AUTH_CHANGE_PASSWORD_FAILURE });

/* CHANGE PROFILE */
export function changeProfileRequest(email, name, username, bio, photo){
    return (dispatch) => {
        // Inform Change Password API is starting
        dispatch(changeProfile());
        // API REQUEST
        return axios.put('/api/account/profile/change', { email, name, username, bio, photo})
        .then((response) => {
            //SUCCEED
            let profile = response.data.profile;
            dispatch(changeProfileSuccess(profile));
            //FAILED
        }).catch((error) => {
            dispatch(changeProfileFailure(error.response.data.code));
        });
    };
}

export const changeProfile = () => ({ type: CHANGE_PROFILE });

export const changeProfileSuccess = (profile) => ({ type : CHANGE_PROFILE_SUCCESS, profile });

export const changeProfileFailure = () => ({ type : CHANGE_PROFILE_FAILURE });

/* DELETE PROFILE IMG */
export function deleteProfileImgRequest(email){
    return (dispatch) => {
        // Inform Change Password API is starting
        dispatch(deleteProfileImg());

        // API REQUEST
        return axios.put('/api/account/profile/img/delete', {email})
        .then((response) => {
            //SUCCEED
            dispatch(deleteProfileImgSuccess());
            //FAILED
        }).catch((error) => {
            dispatch(deleteProfileImgFailure(error.response.data.code));
        });
    };
}

export const deleteProfileImg = () => ({ type: DELETE_PROFILE_IMG });

export const deleteProfileImgSuccess = () => ({ type : DELETE_PROFILE_IMG_SUCCESS });

export const deleteProfileImgFailure = () => ({ type : DELETE_PROFILE_IMG_FAILURE });

/* CHANGE PROFILEM IMG */
export function changeProfileImgRequest(email, path){
    return (dispatch) => {
        // Inform Change Password API is starting
        dispatch(changeProfileImg());
        // API REQUEST
        return axios.put('/api/account/photo/change', {email, path})
        .then((response) => {
            //SUCCEED
            dispatch(changeProfileImgSuccess(path));
            //FAILED
        }).catch((error) => {
            dispatch(changeProfileImgFailure(error.response.data.code));
        });
    };
}

export const changeProfileImg = () => ({ type: CHANGE_PROFILE_IMG });

export const changeProfileImgSuccess = (path) => ({ type : CHANGE_PROFILE_IMG_SUCCESS, path });

export const changeProfileImgFailure = () => ({ type : CHANGE_PROFILE_IMG_FAILURE });

/* GET STATUS */
export function getStatusRequest() {
    return (dispatch) => {
        // inform Get Status API is starting
        dispatch(getStatus());

        return axios.get('/api/account/getInfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.info.username));
        }).catch((error) => {
            dispatch(getStatusFailure());
        });
    };
}

export const getStatus = () => ({ type: AUTH_GET_STATUS });

export const getStatusSuccess = (username) => ({ type: AUTH_GET_STATUS_SUCCESS, username });

export const getStatusFailure = () => ({ type: AUTH_GET_STATUS_FAILURE });



/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return axios.post('/api/account/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}

const initialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    profile: {
        status: 'INIT',
    },
    passChg: {
        status: 'INIT',
        error: -1
    },
    profileChg: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        currentUser: '',
        username: '',
        profile: {
            photo: '',
            bio: ''
        }
    }
};

// **** 리듀서 작성
export default function authentication(state = initialState, action) {
    if (typeof state === "undefined")
        state = initialState;

    switch (action.type) {
        /* LOGIN */
        case AUTH_LOGIN:
            return update(state, {
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case AUTH_LOGIN_SUCCESS:
            return update(state, {
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    currentUser: { $set: action.account.email },
                    username: { $set: action.account.username },
                    name: { $set: action.account.name },
                    profile: {
                        photo: { $set: action.account.profile.photo },
                        bio: { $set: action.account.profile.bio }
                    }
                }
            });
        case AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });

        /* REGISTER */
        case AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                    }
                });
        /* CHANGE PASSWORD */
        case AUTH_CHANGE_PASSWORD:
            return update(state, {
                passChg: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case AUTH_CHANGE_PASSWORD_SUCCESS:
            return update(state, {
                passChg: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case AUTH_CHANGE_PASSWORD_FAILURE:
            return update(state, {
                passChg: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* CHANGE PROFILE */
        case CHANGE_PROFILE:
            return update(state, {
                profileChg: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case CHANGE_PROFILE_SUCCESS:
            return update(state, {
                profileChg: {
                    status: { $set: 'SUCCESS' }
                },
                status :{
                    username: { $set: action.profile.username },
                    name: { $set: action.profile.name },
                    profile: {
                        bio: { $set: action.profile.bio }
                    }
                }
            });
        case CHANGE_PROFILE_FAILURE:
            return update(state, {
                profileChg: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* DELETE PROFILE IMG */
        case DELETE_PROFILE_IMG:
            return update(state, {
                profileChg: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case DELETE_PROFILE_IMG_SUCCESS:
            return update(state, {
                profileChg: {
                    status: { $set: 'SUCCESS' }
                },
                status :{
                    profile: {
                        photo: { $set: '' }
                    }
                }
            });
        case DELETE_PROFILE_IMG_FAILURE:
            return update(state, {
                profileChg: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* CHANGE PROFILE IMG */
        case CHANGE_PROFILE_IMG:
            return update(state, {
                profileChg: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case CHANGE_PROFILE_IMG_SUCCESS:
            return update(state, {
                profileChg: {
                    status: { $set: 'SUCCESS' }
                },
                status :{
                    profile: {
                        photo: { $set: action.path }
                    }
                }
            });
        case CHANGE_PROFILE_IMG_FAILURE:
            return update(state, {
                profileChg: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        /* GET_STATUS */
        case AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }
            });
        case AUTH_GET_STATUS_SUCCESS:
            return update(state, {
                status: {
                    valid: { $set: true },
                    currentUser: { $set: action.username }
                }
            });
        case AUTH_GET_STATUS_FAILURE:
            return update(state, {
                status: {
                    valid: { $set: false },
                    isLoggedIn: { $set: false }
                }
            });

         /* LOGOUT */
        case AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    currentUser: { $set: '' }
                }
            });
        default:
            return state;
    }
};