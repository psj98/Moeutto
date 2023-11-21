package com.ssafy.moeutto.domain.friendOutfit.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Getter
@NoArgsConstructor
public class FriendOutfitListResponseDto {

    @NotNull
    private List<FriendOutfitClothesResponseDto> clothesList; // 옷 목록

    @NotNull
    private String recommenderNickname; // 추천자 닉네임

    @NotNull
    private String comment; // 코멘트

    @NotNull
    private Date regDate; // 추천 날짜

    @Builder(toBuilder = true)
    public FriendOutfitListResponseDto(List<FriendOutfitClothesResponseDto> clothesList, String recommenderNickname, String comment, Date regDate) {
        this.clothesList = clothesList;
        this.recommenderNickname = recommenderNickname;
        this.comment = comment;
        this.regDate = regDate;
    }
}