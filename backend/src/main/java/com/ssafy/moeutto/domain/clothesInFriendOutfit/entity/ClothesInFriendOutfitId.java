package com.ssafy.moeutto.domain.clothesInFriendOutfit.entity;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class ClothesInFriendOutfitId implements Serializable {

    private Integer clothesId; // 옷 정보 id

    private Integer friendOutfitId; // 친구 추천 착장 id

    @Builder(toBuilder = true)
    public ClothesInFriendOutfitId(Integer clothesId, Integer friendOutfitId) {
        this.clothesId = clothesId;
        this.friendOutfitId = friendOutfitId;
    }
}
