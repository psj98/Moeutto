package com.ssafy.moeutto.domain.friends.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Getter
@NoArgsConstructor
public class TestRequestDto {
    private UUID myId;
    private UUID followingId;
}
