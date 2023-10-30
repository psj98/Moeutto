// rootReducer.js
import { combineReducers } from "redux";
import selectClosetReducer from "./features/closet/selectClosetSlice";


const rootReducer = combineReducers({
  closet: selectClosetReducer,
  // 추가적인 리듀서가 있다면 여기에 추가
});

export default rootReducer;
