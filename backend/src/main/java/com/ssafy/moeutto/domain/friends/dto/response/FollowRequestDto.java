package com.ssafy.moeutto.domain.friends.dto.response;


import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class FollowRequestDto {
    @NotNull
    private String email;

    public FollowRequestDto(String email) {
        this.email = email;
    }
}
