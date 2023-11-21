package com.ssafy.moeutto.domain.friendOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class FriendOutfitClothesResponseDto {

    private Integer id;

    private String image;

    @Builder(toBuilder = true)
    public FriendOutfitClothesResponseDto(Integer id, String image) {
        this.id = id;
        this.image = image;
    }
}