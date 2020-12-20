import axios from "axios";
import produce from 'immer';

import createReducer from './createReducer';
import { getFacilityListAsync } from './FacilityState';
import { dispatch } from './store';
import { request } from "./axios";

const SET_CONFIRMED = "lookup/SET_CONFIRMED";
const SET_CONFIRMED_PENDING = "lookup/SET_CONFIRMED_PENDING";
const SET_CONFIRMED_ERROR = "lookup/SET_CONFIRMED_ERROR";
const REGISTER = "login/REGISTER";
const GET_FACILITYLIST = "lookup/GET_FACILITYLIST";
//const REMOVE = `lookup/REMOVE`;
//const EDIT = `lookup/EDIT`;

function getConfirmedAPI(name, phone) { // return user_id by (name, phone)
    return axios.get("");
}

function asynchronousAPI(name, phone) {
    return new Promise((resolve) => {
            setTimeout(() => {
                
                resolve({'user_id': name}); // promise 가 끝났음을 알림
            }, 3000)
        }
    )
}

export const getConfirmedAsync = (name, phone) => async (dispatch, getState) => {

    dispatch({type: SET_CONFIRMED_PENDING});
    const data = await asynchronousAPI(name, phone);
    // const data = (await request("POST", "https://key.prider.xyz/get-info", {'name': name, 'phone': phone})).data;

    dispatch(getConfirmed({...data, 'name': name, 'phone': phone}));

    const confirmedId = getState().confirmed.user_id;
    if (confirmedId !== null){
        
        dispatch(getFacilityListAsync(confirmedId));
    } else {
        const errorMsg = "Cannot get user_id";
        dispatch({
            type: SET_CONFIRMED_ERROR,
            data: errorMsg
        })
    }

    console.log("ConfirmedState.js - getState() : ", getState());
};

export const getConfirmed = (data) => {
    console.log("ConfirmedState.js - getConfirmed()");

    // const payload = {'name': data.name, 'phone': data.phone};
    
    return {
        type: SET_CONFIRMED,
        data: data
    }
}

const INITIAL_STATE = { pending: false, error: false, confirmed: {} }
const reducer = createReducer(INITIAL_STATE, {
    [SET_CONFIRMED]: (state, action) => {
        // console.log("ConfirmedState.js - in SET_CONFIRMED case - state : ", state);
        // console.log("ConfirmedState.js - in SET_CONFIRMED case - action : ", action);
        state.confirmed = action.data; 
        state.pending = false;
    },
    [SET_CONFIRMED_ERROR]: (state, action) => {
        console.log(action.data);
        state.error = true;
    },
    [SET_CONFIRMED_PENDING]: (state, action) => {
        state.pending = true;
    }
})      

export default reducer;

// const reducer = function(state = INITIAL_STATE, action){
//     return produce(state, draft => {
//         switch (action.type) {
//             case SET_CONFIRMED :
//                 console.log("ConfirmedState.js - in SET_CONFIRMED case - state : ", state);
//                 console.log("ConfirmedState.js - in SET_CONFIRMED case - action : ", action);
//                 state.confirmed = action.data; 
//                 break;
//             case SET_CONFIRMED_ERROR :
//                 console.log("in SET_CONFIRMED_ERROR case : ");
                
//                 break;
//         }
//     });
// }