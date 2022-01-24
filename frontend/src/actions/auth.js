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
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    LOGOUT
} from '../actions/types';
import axios from 'axios';
import { logToConsole } from "../utils/utils";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((request) => {
    logToConsole('API Request : ', request.url);
    return request;
});

axiosInstance.interceptors.response.use((response) => {
    logToConsole('API Response : ', response.config.url + " -> " + JSON.stringify(response.statusText));
    return response;
});

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': "application/json"
            }
        }

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

            if (response.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAILED
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAILED
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAILED
        });
    }
};

export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': "application/json"
            }
        }

        try {
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: response.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAILED
            });
        }
    }
    else {
        dispatch({
            type: USER_LOADED_FAILED
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });

        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAILED
        });
    }
};

export const signup = (name, email, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, re_password });

    try {
        const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAILED
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token });

    try {
        await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAILED
        });
    }
}

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAILED
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, new_re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, new_re_password });

    try {
        await axiosInstance.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAILED
        });
    }
}

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}