package com.ssafy.moeutto.domain.friends.dto.response;


import com.ssafy.moeutto.domain.friends.entity.Following;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Getter
@NoArgsConstructor
public class TestResponseDto {

    @Builder
    public TestResponseDto(Following following) {
        this.following = following;
    }

    private Following following;

}
