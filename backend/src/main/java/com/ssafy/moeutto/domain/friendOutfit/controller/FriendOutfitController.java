package com.ssafy.moeutto.domain.friendOutfit.controller;

import com.ssafy.moeutto.domain.friendOutfit.dto.request.FriendOutfitRecommendRequestDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitListResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.dto.response.FriendOutfitRecommendResponseDto;
import com.ssafy.moeutto.domain.friendOutfit.service.FriendOutfitService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/friend-outfits")
@RequiredArgsConstructor
public class FriendOutfitController {

    private final AuthTokensGenerator authTokensGenerator;
    private final BaseResponseService baseResponseService;
    private final FriendOutfitService friendOutfitService;

    /**
     * 친구가 추천한 옷을 저장합니다.
     *
     * @param token                           - 사용자 token
     * @param friendOutfitRecommendRequestDto - 추천한 정보
     * @return FriendOutfitRecommendResponseDto - 추천 정보
     */
    @PostMapping("/recommend")
    public BaseResponse<Object> recommendFriendOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                                      @RequestBody FriendOutfitRecommendRequestDto friendOutfitRecommendRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token);

            FriendOutfitRecommendResponseDto friendOutfitRecommendResponseDto = friendOutfitService.recommendFriendOutfit(memberId, friendOutfitRecommendRequestDto);
            return baseResponseService.getSuccessResponse(friendOutfitRecommendResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.getStatus());
        }
    }

    /**
     * 추천한 옷 목록을 조회합니다.
     *
     * @param token - 사용자 token
     * @return List<FriendOutfitListResponseDto> - 추천 옷 목록
     */
    @GetMapping("")
    public BaseResponse<Object> getFriendOutfitList(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 친구가 추천한 옷 목록 조회
            List<FriendOutfitListResponseDto> friendOutfitListResponseDto = friendOutfitService.getFriendOutfitList(memberId);
            return baseResponseService.getSuccessResponse(friendOutfitListResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 토큰으로 memberId 받아오는 메서드
     *
     * @param token: accessToken
     * @return memberIdFromToken: 사용자 UUID
     * @throws BaseException
     */
    public UUID getMemberIdFromToken(String token) throws BaseException {
        // 토큰 정보 체크
        if (token == null || token.equals("")) {
            throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
        }

        UUID memberIdFromToken = authTokensGenerator.extractMemberId(token); // 사용자 체크
        return memberIdFromToken;
    }
}
