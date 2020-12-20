// import { Cookies } from 'react-cookie';
import axios from "axios";
import Cookies from 'js-cookie';

import createReducer from './createReducer';
import { dispatch } from './store';
import { request } from "./axios";

const LOGIN = "login/LOGIN";
const LOGIN_PENDING = "login/LOGIN_PENDING";
const LOGIN_ERROR = "login/LOGIN_ERROR";

const LOGOUT = "login/LOGOUT";
const LOGOUT_PENDING = "login/LOGOUT_PENDING";
const LOGOUT_ERROR = "login/LOGOUT_ERROR";

const SETTING_JWT = "login/SETTING_JWT";

function asynchronousAPI(id, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("ConfirmedState.js - asynchronousAPI : ", id, password);
            
            // resolve({'success': true, 'token': "JWT eTOKENTOKENTOKENTOKENTOKEN"}); 
            resolve({'id': '방역당국'}); 
        }, 3000)
    })
}

function loginAPI(id, password){
    return request("POST", "/~~~", {'id': id, 'password': password});
}

export const loginAsync = (payload, cookies) => async (dispatch, getState) => {

    dispatch({type: LOGIN_PENDING});
    const data = await asynchronousAPI(payload.id, payload.password);
    // dispatch({type: SETTING_JWT, data: data});
    // Cookies.set('loginInfo', data.token.split(' ')[1]);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    // axios.defaults.headers.common['Content-type'] = `application/json`;
    console.log("UserState.js - Cookies : ", Cookies.get('loginInfo'));

    console.log("ConfirmedState.js - data : ", data);
    dispatch(login(data))

    // return new Promise((resolve) => {
        
    //     resolve(data); // promise 가 끝났음을 알림
    // })
};

const login = (data) => {
    console.log("ConfirmedState.js - setConfirmed()");

    const payload = {'id': data.id};
    
    return {
        type: LOGIN,
        data: payload
    }
}



export const logoutAsync = () => async (dispatch, getState) => {

    dispatch({type: LOGOUT_PENDING});
    console.log("UserState.js - after dispatching LOGOUT_PENDING");
    // const data = await asynchronousAPI(payload.id, payload.password);
    
    dispatch({type: LOGOUT})
    console.log("UserState.js - after dispatching LOGOUT");
};

const INITIAL_STATE = { pending: false, error: false, isLogin: false, user: {}, 
    logoutPending: false,
    logoutError: false,
    jwt: {}
}
const reducer = createReducer(INITIAL_STATE, {
    [LOGIN]: (state, action) => {
        console.log("UserState.js - in LOGIN case - state : ", state);
        console.log("UserState.js - in LOGIN case - action : ", action);
        state.user = action.data; 
        state.pending = false;
        state.error = false;
        state.isLogin = true;
    },
    [LOGIN_PENDING]: (state, action) => {
        state.pending = true;
        state.error = false;
        state.isLogin = false;
    },
    [LOGIN_ERROR]: (state, action) => {
        state.pending = false;
        state.error = true;
        state.isLogin = false;
    },
    [LOGOUT]: (state, action) => {
        console.log("UserState.js - in LOGOUT case");
        state.user = {}; 
        state.logoutPending = false;
        state.logoutError = false;
        state.isLogin = false;
    },
    [LOGOUT_PENDING]: (state, action) => {
        state.logoutPending = true;
        state.error = false;
    },
    [LOGOUT_ERROR]: (state, action) => {
        state.logoutPending = false;
        state.logoutError = true;
    },
    [SETTING_JWT]: (state, action) => {
        state.jwt = action.data;
    }
})      

export default reducer;