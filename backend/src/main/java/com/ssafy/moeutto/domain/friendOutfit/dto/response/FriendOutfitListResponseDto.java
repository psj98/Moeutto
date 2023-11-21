package com.ssafy.moeutto.domain.friendOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class FriendOutfitListResponseDto {

    private List<FriendOutfitClothesResponseDto> clothesList;

    private String recommenderNickname;

    private Date regDate;

    @Builder(toBuilder = true)
    public FriendOutfitListResponseDto(List<FriendOutfitClothesResponseDto> clothesList, String recommenderNickname, Date regDate) {
        this.clothesList = clothesList;
        this.recommenderNickname = recommenderNickname;
        this.regDate = regDate;
    }
}