package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ResponseClothesFeature {

    private int temperature; // 따뜻한 정도 ( 낮을수록 시원 )

    private int darkness; // 색상 밝기 정도 ( 낮을수록 밝음 )

    private int seasonX; // 계절 정보 x좌표 (여름, 겨울)

    private int seasonY; // 게절 정보 y좌표 (봄, 가을)

    @Builder(toBuilder = true)
    public ResponseClothesFeature(int temperature, int darkness, int seasonX, int seasonY) {
        this.temperature = temperature;
        this.darkness = darkness;
        this.seasonX = seasonX;
        this.seasonY = seasonY;
    }
}
