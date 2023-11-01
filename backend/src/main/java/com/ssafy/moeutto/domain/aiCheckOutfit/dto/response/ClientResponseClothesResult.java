package com.ssafy.moeutto.domain.aiCheckOutfit.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClientResponseClothesResult {

    int clothesId;
    String largeCategoryId;
    String imageUrl;
    String result;
    int fitnessNum;

    @Builder(toBuilder = true)
    public ClientResponseClothesResult(int clothesId, String largeCategoryId, String imageUrl,
                                       String result, int fitnessNum){
        this.clothesId = clothesId;
        this.largeCategoryId = largeCategoryId;
        this.imageUrl = imageUrl;
        this.result = result;
        this.fitnessNum = fitnessNum;
    }

}
