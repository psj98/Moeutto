package com.ssafy.moeutto.domain.friendOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class FriendOutfitClothesResponseDto {

    @NotNull
    private Integer id;

    @NotNull
    private String image;

    @Builder(toBuilder = true)
    public FriendOutfitClothesResponseDto(Integer id, String image) {
        this.id = id;
        this.image = image;
    }
}