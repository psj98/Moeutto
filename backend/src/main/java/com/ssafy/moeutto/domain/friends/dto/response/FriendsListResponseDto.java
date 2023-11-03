package com.ssafy.moeutto.domain.friends.dto.response;


import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@NotNull
public class FriendsListResponseDto {
    @NotNull
    private String email;
    @NotNull
    private String profileImageUrl;
    @NotNull
    private String nickname;
    @NotNull
    private boolean isFollowing;


    @Builder(toBuilder = true)
    public FriendsListResponseDto(String email, String profileImageUrl, String nickname, boolean isFollowing) {
        this.email = email;
        this.profileImageUrl = profileImageUrl;
        this.nickname = nickname;
        this.isFollowing = isFollowing;
    }
}
