import axios from 'axios';
import {
    USER_LOGING_REQUEST,
    USER_LOGING_SUCCESS,
    USER_LOGING_FAIL,
    USER_LOGOUT
} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGING_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }

        const {data} = await axios.post(
            '/api/users/login/',
            {'username': email, 'password': password}
        )

        dispatch({
            type: USER_LOGING_SUCCESS,
            payload: data,
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error) {
        dispatch({
            type: USER_LOGING_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}