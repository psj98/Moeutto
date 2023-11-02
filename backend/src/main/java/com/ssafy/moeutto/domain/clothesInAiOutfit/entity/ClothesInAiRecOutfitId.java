package com.ssafy.moeutto.domain.clothesInAiOutfit.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
@NoArgsConstructor
public class ClothesInAiRecOutfitId implements Serializable {

    private Integer clothesId; // 옷 정보 id

    private Integer aiRecOutfitId; // AI 추천 착장 id

    @Builder(toBuilder = true)
    public ClothesInAiRecOutfitId(Integer clothesId, Integer aiRecOutfitId) {
        this.clothesId = clothesId;
        this.aiRecOutfitId = aiRecOutfitId;
    }
}
