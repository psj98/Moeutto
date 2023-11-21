package com.ssafy.moeutto.domain.friends.service;

import com.ssafy.moeutto.domain.friends.dto.request.ClothesRecommendForFriendsRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.ClothesRecommendListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.ClotheRecommendResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.IFriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.IMyFriendsListResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface FriendService {

    void follow(UUID memberId, FollowRequestDto requestDto) throws BaseException;

    List<IFriendsListResponseDto> searchFriends(UUID memberId, FriendsListRequestDto requestDto) throws BaseException;

    List<IMyFriendsListResponseDto> searchMyFollowingList(UUID memberId) throws BaseException;

    ClotheRecommendResponseDto recommend(UUID memberId, ClothesRecommendForFriendsRequestDto requestDto) throws BaseException;
}
