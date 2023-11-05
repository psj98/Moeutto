package com.ssafy.moeutto.domain.friends.dto.response;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MyFriendsListResponseDto {
    private String email;
    private String nickname;
    private String profileImage;


    @Builder(toBuilder = true)
    public MyFriendsListResponseDto(String email, String nickname, String profileImage) {
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}
