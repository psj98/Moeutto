package com.ssafy.moeutto.domain.friendOutfit.service;

import com.ssafy.moeutto.domain.friendOutfit.dto.request.FriendOutfitRecommendRequestDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitListResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitRecommendResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface FriendOutfitService {

    /**
     * 친구가 추천한 옷을 저장합니다.
     *
     * @param memberId                        - 사용자 id
     * @param friendOutfitRecommendRequestDto - 추천한 정보
     * @return FriendOutfitRecommendResponseDto - 추천 등록 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    FriendOutfitRecommendResponseDto recommendFriendOutfit(UUID memberId, FriendOutfitRecommendRequestDto friendOutfitRecommendRequestDto) throws BaseException;

    /**
     * 추천한 옷 목록을 조회합니다.
     *
     * @param memberId - 사용자 id
     * @return List<FriendOutfitListResponseDto> - 추천 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<FriendOutfitListResponseDto> getFriendOutfitList(UUID memberId) throws BaseException;
}
