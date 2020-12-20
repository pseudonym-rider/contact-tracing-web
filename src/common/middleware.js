import axios from "axios";
// const middleware = store => next => action => {
//     console.log("middleware start");
//     const result = next(action);
//     console.log("middleware end");
//     return result;
// }
const middleware = function(store){
    return function(next) {
        return function(action) {
            console.log('middleware.js - store.getState() : ', store.getState());
            console.log('middleware.js - action : ', action);
            const result = next(action);
            console.log('middleware.js - store (after next(action)): ', store.getState());
            console.log('\n');
            return result;
        }
    }
}

export default middleware;