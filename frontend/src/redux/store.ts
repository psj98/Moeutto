// store.js
import { configureStore } from '@reduxjs/toolkit';
import selectClosetReducer from './features/closet/selectClosetSlice';
import postCalendar from './features/closet/postCalendar';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: {
    closet: selectClosetReducer,
    post: postCalendar,
  },
});

export type RootState = ReturnType<typeof rootReducer>; // 정확한 RootState 타입 정의

export default store;
