package com.ssafy.moeutto.domain.aiCheckOutfit.controller;

import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.PythonRequestClothesList;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitClientResponseDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.service.AICheckOutfitService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/ai-check-outfits")
@RequiredArgsConstructor
public class AICheckOutfitController {

    private final AICheckOutfitService aiCheckOutfitService;
    private final AuthTokensGenerator authTokensGenerator;
    private final BaseResponseService baseResponseService;

    @PostMapping("/check")
    public BaseResponse<Object> aiCheckOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                              @RequestBody AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            AICheckOutfitClientResponseDto aiCheckOutfitClientResponseDto = aiCheckOutfitService.checkOutfit(memberId, aiCheckOutfitClientRequestDto);
            return baseResponseService.getSuccessResponse(aiCheckOutfitClientResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 테스트용
     *
     * @param token
     * @param aiCheckOutfitClientRequestDto
     * @return
     */
    @PostMapping("/test")
    public BaseResponse<Object> aiCheckOutfitTest(@RequestHeader(value = "accessToken", required = false) String token,
                                                  @RequestBody AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            PythonRequestClothesList aiCheckOutfitClientResponseDto = aiCheckOutfitService.checkOutfitTest(memberId, aiCheckOutfitClientRequestDto);
            return baseResponseService.getSuccessResponse(aiCheckOutfitClientResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * accessToken으로 사용자 정보를 체크합니다.
     *
     * @param token - accessToken
     * @return UUID - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    public UUID getMemberIdFromToken(String token) throws BaseException {
        // 토큰 정보 체크
        if (token == null || token.equals("")) {
            throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
        }

        return authTokensGenerator.extractMemberId(token);
    }
}
