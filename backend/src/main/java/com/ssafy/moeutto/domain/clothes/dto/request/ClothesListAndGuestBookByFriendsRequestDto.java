package com.ssafy.moeutto.domain.clothes.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ClothesListAndGuestBookByFriendsRequestDto {

    @NotNull
    private String email; // 이메일
}
