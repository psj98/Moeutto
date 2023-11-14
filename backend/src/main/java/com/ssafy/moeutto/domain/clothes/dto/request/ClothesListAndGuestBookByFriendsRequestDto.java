package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

/**
 * 친구 이메일 정보 Request Dto
 */
@Getter
@NoArgsConstructor
public class ClothesListAndGuestBookByFriendsRequestDto {

    @NotNull
    private String email; // 이메일
}
