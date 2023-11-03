package com.ssafy.moeutto.domain.friends.service;

import com.ssafy.moeutto.domain.friends.dto.response.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.UUID;

public interface FriendService {
    TestResponseDto testService();
    void follow(UUID memberId, FollowRequestDto requestDto) throws BaseException;
}
