package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PythonResponseClothesResult {

    int clothesId;
    String result;
    int fitnessNum;

    @Builder(toBuilder = true)
    public PythonResponseClothesResult(int clothesId, String result, int fitnessNum){
        this.clothesId = clothesId;
        this.result = result;
        this.fitnessNum = fitnessNum;
    }

}
