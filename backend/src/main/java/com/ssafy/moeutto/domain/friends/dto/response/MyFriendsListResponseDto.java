package com.ssafy.moeutto.domain.friends.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class MyFriendsListResponseDto {
    @NotNull
    private String email;
    @NotNull
    private String nickname;
    @NotNull
    private String profileImage;


    @Builder(toBuilder = true)
    public MyFriendsListResponseDto(String email, String nickname, String profileImage) {
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
