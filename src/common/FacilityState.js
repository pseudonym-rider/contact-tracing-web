import createReducer from './createReducer';
import { request } from "./axios";

import { getVisitorListAsync, GET_VISITORLIST_PENDING } from './VisitorState';

const GET_FACILITYLIST = "lookup/GET_FACILITYLIST";
const GET_FACILITYLIST_PENDING = "lookup/GET_FACILITYLIST_PENDING";

const SET_SELECTED_FACILITY = "lookup/SET_SELECTED_FACILITY";

const facilities = [
    {'Name': '경주농협 성건지점', 'Location': '서울특별시 송파구 송파동 499-101', 'visit_time': '2020-12-10 13:03:30'},
    {'Name': '경주충효지구 이안아파트', 'Location': '서울특별시 강남구 대치동 788-13', 'visit_time': '2020-12-10 13:03:30'},
    {'Name': '경북70자2527', 'Location': '서울특별시 강남구 일원동 155-57', 'visit_time': '2020-12-10 13:03:30'},
    {'Name': '88분식', 'Location': '서울특별시 송파구 송파동 529-55', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '부산식육점', 'Location': '서울특별시 강남구 대치동 225-33', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '안강찜질사우나 여탕', 'Location': '서울특별시 강남구 일원동 777-44', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '고향맛', 'Location': '서울특별시 종로구 혜화동 399-78', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '서경주역(승차) 동대구역(하차)	', 'Location': '서울특별시 광진구 광진동 456-88', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '경주시니어 클럽 국시사랑', 'Location': '서울특별시 종로구 혜화동 399-21', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '우리골프연습장', 'Location': '서울특별시 서초구 서초동 399-78', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': 'CU편의점', 'Location': '서울특별시 서초구 방배동 456-78', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '이디야커피 경주안강점', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30'},
    // {'Name': '경주본가뒷고기', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30'}
];

function convertTimeFormat(utcTime){
    var timeObj = new Date(utcTime);
    var year = timeObj.getFullYear();
    var month = timeObj.getMonth() + 1;
    var date = timeObj.getDate();
    var hour = timeObj.getHours();
    var minute = timeObj.getMinutes();
    var second = timeObj.getSeconds();

    return `${year}-${month}-${date} ${hour}-${minute}-${second}`;
}

export const getFacilityInfoAPI = (user_id) => {
    // console.log("FacilityState.js - getFacilityInfoAPI - user_id : ", user_id);
    return new Promise((resolve) => {
        setTimeout(() => {  
            resolve({'data': 
                {
                    "store_id": user_id,
                    'Location': '서울특별시 송파구 송파동 499-101',
                    "Name": "짜부치킨",
                }
            }); // promise 가 끝났음을 알림
        }, 3000)
    })
}

export const getFacilityIdAPI = (facilityIdArr) => {

    return new Promise((resolve) => {
        setTimeout(() => {  
            resolve({'data': [
                {
                    "store_id": "봉추찜닭",
                    'Location': '서울특별시 송파구 송파동 499-101',
                    "time": "2020년 12월 18일 12:23"
                },
                {
                    "store_id": "세븐일레븐홍대스타점",
                    'Location': '서울특별시 강남구 대치동 788-13',
                    "time": "2020년 12월 18일 13:22"
                },
                {
                    "store_id": "키이스케이프홍대점",
                    'Location': '서울특별시 강남구 일원동 155-57',
                    "time": "2020년 12월 18일 13:33"
                },
                {
                    "store_id": "르꼬끄",
                    'Location': '서울특별시 송파구 송파동 529-55',
                    "time": "2020년 12월 18일 15:57"
                },
                {
                    "store_id": "토끼정홍대",
                    'Location': '서울특별시 강남구 대치동 225-33',
                    "time": "2020년 12월 18일 18:21"
                },
                {
                    "store_id": "에뛰드하우스",
                    'Location': '서울특별시 강남구 일원동 777-44',
                    "time": "2020년 12월 18일 18:08"
                },
                {
                    "store_id": "코쿤",
                    'Location': '서울특별시 종로구 혜화동 399-78',
                    "time": "2020년 12월 18일 21:48"
                }
            ]}); // promise 가 끝났음을 알림
        }, 3000)
    })
}

export const getFacilityListAsync = (confirmedId) => async (dispatch, getState) => {

    console.log("FacilityState.js - getFacilityListAsync()");
    dispatch({type: GET_FACILITYLIST_PENDING});

    const facilityIdArr = (await getFacilityIdAPI(confirmedId)).data;
    // const facilityIdArr = (await request("POST", "https://key.prider.xyz/get-store", confirmedId)).data;
    
    // const facilityInfoArr = (await request("POST", "https://key.prider.xyz/get-info", facilityIdArr)).data;
    // var facilityArr = await Promise.all(facilityIdArr.map(async (element, idx, arr) => {
    //     // const facilityInfo = (await request("POST", "https://key.prider.xyz/get-info", element.store_id)).data;
    //     const facilityInfo = (await getFacilityInfoAPI(element.store_id)).data;
    //     var facilityInfoWithId = Object.assign(facilityInfo, {'time': convertTimeFormat(element.time)});
    //     return facilityInfoWithId;
    // }))
    const facilityArr = (await getFacilityIdAPI(confirmedId)).data;
    console.log("FacilityState.js - facilityArr : ", facilityArr);
    
    dispatch(getFacilityList(facilityArr));

    console.log("FacilityState.js - getState() : ", getState());

    dispatch(getVisitorListAsync(facilityIdArr));
}

export const getFacilityList = (payload) => {
    // const data = payload.map((facility, idx, arr) => {
    //     return {...facility, 'id': idx}
    // })
    console.log("FacilityState.js - getFacilityList()");

    return {
        type: GET_FACILITYLIST,
        payload: payload
    }
}

export const setSelectedFacilityAsync = (facilityId) => async (dispatch) => {
    console.log("FacilityState.js - setSelectedFacilityAsync");
    dispatch(setSelectedFacility(facilityId));
}

export const setSelectedFacility = (facilityId) => {
    return {type: SET_SELECTED_FACILITY, data: facilityId}
}

const INITIAL_STATE = { pending: false, error: false, facilities: [], selectedFacility: ""};
const reducer = createReducer(INITIAL_STATE, {
    [GET_FACILITYLIST]: (state, action) => {
        console.log("FacilityState.js - reducer - GET_FACILITYLIST");
        state.facilities = action.payload;
        state.pending = false;
        state.error = false;
    },
    [GET_FACILITYLIST_PENDING]: (state, action) => {
        state.pending = true;
        state.error = false;
    },
    [SET_SELECTED_FACILITY]: (state, action) => {
        state.selectedFacility = action.data;
    }
})      

export default reducer;