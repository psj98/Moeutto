// rootReducer.js
import { combineReducers } from 'redux';
import selectClosetReducer from './features/closet/selectClosetSlice';
import postCalendar from './features/closet/postCalendar';

const rootReducer = combineReducers({
  closet: selectClosetReducer,
  post: postCalendar,
});

export default rootReducer;
