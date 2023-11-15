package com.ssafy.moeutto.domain.friends.controller;

import com.ssafy.moeutto.domain.friends.dto.request.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.IFriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.IMyFriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.service.FriendService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendsService;
    private final AuthTokensGenerator authTokensGenerator;
    private final BaseResponseService baseResponseService;

    /**
     * 내가 팔로우하는 친구 목록 보기.
     *
     * @param token: accessToken
     * @return List<IMyFriendsListResponseDto>
     */
    @GetMapping("/list")
    public BaseResponse<Object> myFollowingList(@RequestHeader(value = "accessToken") String token) {
        try {
            UUID memberId = getMemberIdFromToken(token);

            List<IMyFriendsListResponseDto> myFriendsList = friendsService.searchMyFollowinglist(memberId);
            return baseResponseService.getSuccessResponse(myFriendsList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 닉네임을 기반으로 친구 목록 검색하는 컨트롤러 입니다.
     *
     * @param token:     accessToken
     * @param requestDto
     * @return List<IFriendsListResponseDto>
     */
    @PostMapping("/search")
    public BaseResponse<Object> searchFriends(@RequestHeader(value = "accessToken") String token,
                                              @RequestBody FriendsListRequestDto requestDto) {

        try {
            UUID memberId = getMemberIdFromToken(token);

            List<IFriendsListResponseDto> responseDto = friendsService.searchFriends(memberId, requestDto);
            return baseResponseService.getSuccessResponse(responseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 팔로우 컨트롤러 입니다.
     *
     * @param token:      액세스토큰
     * @param requestDto: email 담겨있는 Dto
     * @return BaseResponse
     */
    @PostMapping("/follow")
    public BaseResponse<Object> follow(@RequestHeader(value = "accessToken") String token,
                                       @RequestBody FollowRequestDto requestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token);

            friendsService.follow(memberId, requestDto);
            return baseResponseService.getSuccessResponse();
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
