import createReducer from './createReducer';
import { request } from "./axios";

const GET_VISITORLIST = "lookup/GET_VISITORLIST";
export const GET_VISITORLIST_PENDING = "lookup/GET_VISITORLIST_PENDING";
const GET_VISITORLIST_ERROR = "lookup/GET_VISITORLIST_ERROR";

const visitors = [ 
    {'Name': '손우정', 'Location': '서울특별시 송파구 송파동 499-101', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 강남구 대치동 788-13', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '이은표', 'Location': '서울특별시 강남구 일원동 155-57', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 송파구 송파동 529-55', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '신명수', 'Location': '서울특별시 강남구 대치동 225-33', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '오선식', 'Location': '서울특별시 강남구 일원동 777-44', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '이승준', 'Location': '서울특별시 종로구 혜화동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 광진구 광진동 456-88', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 종로구 혜화동 399-21', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '박승민', 'Location': '서울특별시 서초구 서초동 399-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '오선식', 'Location': '서울특별시 서초구 방배동 456-78', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'},
    {'Name': '손우정', 'Location': '서울특별시 관악구 봉천동 963-85', 'visit_time': '2020-12-10 13:03:30', 'Phone': '010-4566-3323'}
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

// export const getVisitorIdArr = (facilityIdArr) => {
//     var idArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "ZZ"];
//     return new Promise((resolve) => {
//         setTimeout(() => {  
//             resolve({'data': [
//                 {
//                     "user_id": idArr[Math.floor(Math.random() * idArr.length)],
//                     "time": 1608277380
//                 },
//                 {
//                     "user_id": idArr[Math.floor(Math.random() * idArr.length)],
//                     "time": 1608277572
//                 },
//                 {
//                     "user_id": idArr[Math.floor(Math.random() * idArr.length)],
//                     "time": 1608277666
//                 },
//                 {
//                     "user_id": idArr[Math.floor(Math.random() * idArr.length)],
//                     "time": 1608277681
//                 }
//             ]}); // promise 가 끝났음을 알림
//         }, 300)
//     })
// }

export const getVisitorIdArr = (facilityIdArr) => {
    
    return new Promise((resolve) => {
        setTimeout(() => {  
            resolve({'data': {
                "에뛰드하우스": [
                    {
                        "user_id": "wjstkdgus123",
                        "name": "전상현",
                        "time": "2020년 12월 18일 18:18"
                    },
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 18:38"
                    },
                    {
                        "user_id": "qorthdtjs123",
                        "name": "백송선",
                        "time": "2020년 12월 18일 19:01"
                    },
                    {
                        "user_id": "qkrtmdals123",
                        "name": "백예린",
                        "time": "2020년 12월 18일 19:07"
                    },
                    {
                        "user_id": "asdfawerdals125",
                        "name": "박승민",
                        "time": "2020년 12월 18일 18:34"
                    }, 
                ],
                "봉추찜닭": [
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 12:32"
                    },
                    {
                        "user_id": "dltmdwns123",
                        "name": "이승민",
                        "time": "2020년 12월 18일 12:45"
                    },
                    {
                        "user_id": "chlqudcks123",
                        "name": "최병찬",
                        "time": "2020년 12월 18일 12:68"
                    },
                    {
                        "user_id": "ghkdwnstjr123",
                        "name": "황준석",
                        "time": "2020년 12월 18일 12:59"
                    },
                ],
                "세븐일레븐홍대스타점": [
                    {
                        "user_id": "chlqudcks123",
                        "name": "최병찬",
                        "time": "2020년 12월 18일 13:25"
                    },
                    {
                        "user_id": "ghkdwnstjr123",
                        "name": "황준석",
                        "time": "2020년 12월 18일 13:22"
                    },
                    {
                        "user_id": "dldmsvy123",
                        "name": "이은표",
                        "time": "2020년 12월 18일 14:10"
                    },
                ],
                "키이스케이프홍대점": [
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 13:12"
                    },
                    {
                        "user_id": "gkswhdgh123",
                        "name": "한종호",
                        "time": "2020년 12월 18일 13:00"
                    },
                    {
                        "user_id": "tjdPwls123",
                        "name": "서예진",
                        "time": "2020년 12월 18일 13:05"
                    },
                    {
                        "user_id": "whgusdn123",
                        "name": "조현우",
                        "time": "2020년 12월 18일 13:59"
                    },
                    {
                        "user_id": "rladjwls123",
                        "name": "김어진",
                        "time": "2020년 12월 18일 14:25"
                    },
                    {
                        "user_id": "wjdthdus123",
                        "name": "정소연",
                        "time": "2020년 12월 18일 14:01"
                    },
                ],
                "르꼬끄": [
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 15:59"
                    },
                    {
                        "user_id": "qkrtmdals123",
                        "name": "박승민",
                        "time": "2020년 12월 18일 16:14"
                    },
                    {
                        "user_id": "qordPfls123",
                        "name": "백예린",
                        "time": "2020년 12월 18일 16:22"
                    },
                    {
                        "user_id": "qorthdtjs123",
                        "name": "백송선",
                        "time": "2020년 12월 18일 16:58"
                    },
                ],
                "토끼정홍대": [
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 18:22"
                    },
                    {
                        "user_id": "thsdnwjd123",
                        "name": "손우정",
                        "time": "2020년 12월 18일 18:00"
                    },
                    {
                        "user_id": "tjdPwls123",
                        "name": "서예진",
                        "time": "2020년 12월 18일 18:59"
                    },
                    {
                        "user_id": "whgusdn123",
                        "name": "조현우",
                        "time": "2020년 12월 18일 18:33"
                    },
                    {
                        "user_id": "rladjwls123",
                        "name": "김어진",
                        "time": "2020년 12월 18일 18:21"
                    },
                    {
                        "user_id": "wjdthdus123",
                        "name": "정소연",
                        "time": "2020년 12월 18일 18:27"
                    },
                ],
                "코쿤": [
                    {
                        "user_id": "dldmsvy1010",
                        "name": "이은표",
                        "time": "2020년 12월 18일 22:00"
                    },
                    {
                        "user_id": "tlsaudtn123",
                        "name": "신명수",
                        "time": "2020년 12월 18일 22:01"
                    },
                    {
                        "user_id": "rladjwls123",
                        "name": "김어진",
                        "time": "2020년 12월 18일 21:44"
                    },
                    {
                        "user_id": "wjdthdus123",
                        "name": "정소연",
                        "time": "2020년 12월 18일 21:00"
                    },
                ],
            }}); // promise 가 끝났음을 알림
        }, 300)
    })
}

export const getVisitorInfoAPI = (user_id) => {
    return new Promise((resolve) => {
        setTimeout(() => {  
            resolve({'data': 
                {
                    "user_id": user_id,
                    'Location': '서울특별시 송파구 송파동 499-101',
                    "Name": "짜부치킨",
                }
            }); // promise 가 끝났음을 알림
        }, 300)
    })
}

export const getVisitorListAsync = (facilityIdArr) => async (dispatch, getState) => {

    console.log("VisitorState.js - getVisitorListtAsync() - facilityIdArr", facilityIdArr);

    dispatch({type: GET_VISITORLIST_PENDING});
    
    
    /*
    await Promise.all(facilityIdArr.map(async (facilityId, idx, arr) => {
        //var visitorIdTimeArr = (await request("POST", "https://key.prider.xyz/get-person", facilityId.store_id)).data;
        var visitorIdTimeArr = (await getVisitorIdArr(facilityId.store_id)).data;
        // [
        //     {
        //         "user_id": "ghdrlfehd123",
        //         "time": "1608277380"
        //     },
        //     {
        //         "user_id": "ghdrlfehd123",
        //         "time": "1608277572"
        //     }
        // ]
        var visitorInfoWithIdTime = await Promise.all(visitorIdTimeArr.map(async (visitorIdTime, idx, arr) => {
            // var visitorInfo = (await request("POST", "https://key.prider.xyz/get-info", visitorIdTime.user_id)).data;
            var visitorInfo = (await getVisitorInfoAPI(visitorIdTime.user_id)).data;
            return Object.assign(visitorInfo, {'time': convertTimeFormat(visitorIdTime.time)});
        }))
        // [
        //     {
        //         "user_id": "ghdrlfehd123",
        //         "time": "1608277380",
        //         "name": "손우정"
        //     },
        //     {
        //         "user_id": "ghdrlfehd123",
        //         "time": "1608277572",
        //         "name": "이은표"
        //     }
        // ]
        visitorObj[facilityId.store_id] = visitorInfoWithIdTime;
        return
    }))
    */
    var visitorObj = (await getVisitorIdArr(facilityIdArr)).data;

    dispatch(getVisitorList(visitorObj))
    // const VisitorIdArr = (await getVisitorListAPI(facilityIdArr)).data;
    // const facilityIdArr = await request("POST", "key.prider.xyz/get-store", facilityIdArr).data;
    console.log("VisitorState.js - getState() : ", getState());

}


export const getVisitorList = (payload) => {
    console.log("payload in getVisitorList : ", payload);
    
    // const data = payload.map((visitor, idx, arr) => {
    //     return {...visitor, 'id': idx}
    // })

    return {
        type: GET_VISITORLIST,
        data: payload
    }
}

const INITIAL_STATE = { pending: false, error: false, visitors: {} };
const reducer = createReducer(INITIAL_STATE, {
    [GET_VISITORLIST]: (state, action) => {
        state.visitors = action.data;
        state.pending = false;
    },
    [GET_VISITORLIST_PENDING]: (state, action) => {
        state.pending = true;
        state.error = false;
    }
})      

export default reducer;