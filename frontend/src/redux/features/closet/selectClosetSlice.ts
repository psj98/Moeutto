// selectCloset 관련 redux toolkit 모듈 파일
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/* {
	// 선택한 옷 목록
	"clothesList": [
		{
			"id": int, // 옷 id
			"largeCategoryId": String, // 대분류
		}, ...
	],
	// 금일 날씨 정보
	"weatherInfo": {
		// 날씨 정보
		"sky" : int, // 하늘 상태 코드 ( 1 맑음, 3 구름 많음, 4 흐림 )
		"pty" : int, // 강수 형태 코드 ( 0 없음, 1 비, 2 비/눈, 3 눈, 4 소나기)
		"tmn" : double ? , // 일 최저기온 ( 섭씨 )
		"tmx" : double ? , // 일 최고기온 ( 섭씨 )
		"wsd" : double ? , // 풍속 ( m/s )
	}
} */

interface selectedCloth {
  id: number;
  largeCategoryId: string;
} // 대분류}
// 타입
interface SelectedClosetComponentState {
  selectedClosetIds: selectedCloth[];
}

// 초기 상태 정의
const initialState: SelectedClosetComponentState = {
  // 빈 리스트
  selectedClosetIds: [],
};

// 액션 생성 함수
const selectClosetSlice = createSlice({
  // 액션 타입 정의
  name: 'selectCloset',
  // 초기 상태
  initialState,
  // 리듀서 맵
  reducers: {
    // 리듀서 함수
    // 아래 코드는 리듀서와 액션 생성자 함수가 분리되지 않은 형태로 작성함
    selectCloset: (state, action: PayloadAction<selectedCloth>) => {
      const { selectedClosetIds } = state;
      const clothesId = action.payload;

      const index = selectedClosetIds.findIndex(cloth => cloth.id === clothesId.id);

      if (index === -1) {
        // 리스트에 없으면 추가
        state.selectedClosetIds = [...selectedClosetIds, clothesId];
      } else {
        // 리스트에 있으면 삭제
        state.selectedClosetIds = selectedClosetIds.filter(cloth => cloth.id !== clothesId.id);
      }
    },
  },
});

export const { selectCloset } = selectClosetSlice.actions;

export default selectClosetSlice.reducer;
