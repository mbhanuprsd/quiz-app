import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAILED,
    LOGOUT
} from '../actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            }
        case AUTHENTICATED_FAILED:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAILED:
            return {
                ...state,
                user: null
            }
        case LOGIN_FAILED:
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAILED:
        case PASSWORD_RESET_CONFIRM_SUCCESS:
        case PASSWORD_RESET_CONFIRM_FAILED:
            return {
                ...state
            }
        default:
            return state
    }
};
