package com.ssafy.moeutto.domain.friends.controller;


import com.ssafy.moeutto.domain.friends.dto.response.FollowRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.TestResponseDto;
import com.ssafy.moeutto.domain.friends.service.FriendService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendsService;
    private final AuthTokensGenerator authTokensGenerator;
    private final BaseResponseService baseResponseService;


    /**
     * 팔로우 컨트롤러 입니다.
     * @param token: 액세스토큰
     * @param requestDto: email 담겨있는 Dto
     * @return
     */
    @PostMapping("")
    public BaseResponse<Object> follow(@RequestHeader (value = "accessToken") String token,
                                       @RequestBody FollowRequestDto requestDto){

        try{
            UUID memberId = getMemberIdFromToken(token);
            friendsService.follow(memberId, requestDto);
            return baseResponseService.getSuccessResponse();
        }catch(BaseException e){
            return baseResponseService.getFailureResponse(e.status);
        }
    }


    /**
     * 토큰으로 memberId 받아오는 메서드
     * @param token
     * @return
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

    @PostMapping("/test")
    public TestResponseDto test(){

        TestResponseDto responseDto = friendsService.testService();

        return responseDto;
    }

}
