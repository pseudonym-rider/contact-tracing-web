import produce from 'immer';

export default function createReducer(initialState, handlerMap) {
  return function(state = initialState, action) {
    // console.log("createReducer.js - action : ", action);
    return produce(state, draft => {
      const handler = handlerMap[action.type];
      if (handler) {
        handler(draft, action);
      }
    });
  };
}


// produce(A, B) 
// - 첫번째 매개변수는 변경하고자 하는 객체를 나타냄.
// - 두번째 매개변수는 첫번째 매개변수로 입력된 객체를 수정하는 함수.

// 지금 잘 모르겠는 거 : 액션 생성자 함수(getFacilityList)랑 Reducer의 함수[GET_FACILITYLIST]랑 어떻게 연결되는거지?
// A) dispatch함수로 리덕스 라이브러리 내부적으로 연결되는듯?