import { createStore, combineReducers, applyMiddleware } from "redux";
import confirmedReducer from "./ConfirmedState";
import facilitiesReducer from "./FacilityState";
import visitorsReducer from "./VisitorState";
import loginReducer from "./UserState";
import middleware from "./middleware";
import ReduxThunk from 'redux-thunk';
// import reducer from "../friend/state";

const reducer = combineReducers({
    confirmed: confirmedReducer,
    facilities: facilitiesReducer,
    visitors: visitorsReducer,
    user: loginReducer
});
const store = createStore(reducer, applyMiddleware(ReduxThunk));

let prevState;
store.subscribe(() => {
    const state = store.getState();
    if (state === prevState) {
        console.log("상탯값 같음");
    } else {
        console.log("상탯값 변경됨", "이전 상탯값", prevState, "현재 상탯값", state);
    }
    prevState = state;
})

export default store;