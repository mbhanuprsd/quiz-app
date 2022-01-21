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
import axios from 'axios';

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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

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
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create`, body, config);

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

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAILED
        });
    }
}

export const reset_password_confirm = (uid, token, new_password, new_re_password) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, new_re_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
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