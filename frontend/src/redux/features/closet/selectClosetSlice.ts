// selectCloset 관련 redux toolkit 모듈 파일
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 타입
interface SelectedClosetComponentState {
    selectedClosetIds: string[];
}

// 초기 상태 정의
const initialState: SelectedClosetComponentState = {
    // 빈 리스트
    selectedClosetIds: []
};

// 액션 생성 함수
const selectClosetSlice = createSlice({
    // 액션 타입 정의
    name: "selectCloset",
    // 초기 상태
    initialState,
    // 리듀서 맵
    reducers: {
        // 리듀서 함수
        // 아래 코드는 리듀서와 액션 생성자 함수가 분리되지 않은 형태로 작성함
        selectCloset: (state, action: PayloadAction<string>) => {
            const { selectedClosetIds } = state;
            const clothesId = action.payload;
            const index = selectedClosetIds.indexOf(clothesId);

            if (index === -1) {
                // 리스트에 없으면 추가
                state.selectedClosetIds = [...selectedClosetIds, clothesId];
            } else {
                // 리스트에 있으면 제거
                state.selectedClosetIds = selectedClosetIds.filter(id => id!== clothesId);
            }
        }
    }
})

export const { selectCloset } = selectClosetSlice.actions;

export default selectClosetSlice.reducer;