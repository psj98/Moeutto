package com.ssafy.moeutto.domain.friends.dto.request;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class FriendsListRequestDto {

    @NotNull
    private String nickname;

}
