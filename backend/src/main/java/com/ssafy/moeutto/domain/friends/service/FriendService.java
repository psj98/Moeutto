package com.ssafy.moeutto.domain.friends.service;

import com.ssafy.moeutto.domain.friends.dto.request.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.FriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface FriendService {
    TestResponseDto testService();
    void follow(UUID memberId, FollowRequestDto requestDto) throws BaseException;
    List<FriendsListResponseDto> searchFriends(UUID memberId, FriendsListRequestDto requestDto) throws BaseException;
}
