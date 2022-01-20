import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAILED,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
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

            if(response.data.code !== 'token_not_valid')
            {
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

export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
}