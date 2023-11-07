// selectCloset 관련 redux toolkit 모듈 파일
import { createSlice } from '@reduxjs/toolkit';

// 타입
interface SelectedClosetComponentState {
  selectedClosetUrls: string[];
}

// 초기 상태 정의
const initialState: SelectedClosetComponentState = {
  // 빈 리스트
  selectedClosetUrls: [],
};

// 액션 생성 함수
const postCalendar = createSlice({
  // 액션 타입 정의
  name: 'calendar',
  // 초기 상태
  initialState,
  // 리듀서 맵
  reducers: {
    // 리듀서 함수
    // 아래 코드는 리듀서와 액션 생성자 함수가 분리되지 않은 형태로 작성함
    selectItem: (state, action) => {
      if (action.payload) {
        // 이미지 url이 들어오면 리덕스가 관리하는 state에 추가합니다
        state.selectedClosetUrls = [...state.selectedClosetUrls, action.payload];
      }
      console.log(action.payload);
      console.log(state.selectedClosetUrls);
    },
  },
});

export const { selectItem } = postCalendar.actions;

export const selectedClosetUrls = state => state.selectedClosetUrls;

export default postCalendar.reducer;
