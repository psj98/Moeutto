package com.ssafy.moeutto.domain.aiRecOutfit.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineResponseDto;
import com.ssafy.moeutto.domain.aiRecOutfit.service.AiRecOutfitService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ai-rec-outfits")
@RequiredArgsConstructor
public class AiRecOutfitController {

    private final AiRecOutfitService aiRecOutfitService;
    private final BaseResponseService baseResponseService;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * AI가 날씨에 따라 착장을 추천해줍니다.
     *
     * @param token
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AiRecOutfitCombineResponseDto>
     */
//    @PostMapping("/combine")
    @PostMapping("/combine-python-back-front")
    public BaseResponse<Object> recommendOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                                @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = aiRecOutfitService.recommendOutfit(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        } catch (JsonProcessingException e) {
            return baseResponseService.getFailureResponse(BaseResponseStatus.NOT_FOUND_MEMBER);
        }
    }

    /**
     * back to front test code
     *
     * @param token
     * @param aiRecOutfitCombineRequestDtoList
     * @return AiRecOutfitCombineByAIRequestDto
     */
    @PostMapping("/combine-back-front")
    public BaseResponse<Object> recommendOutfitTest(@RequestHeader(value = "accessToken", required = false) String token,
                                                    @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = aiRecOutfitService.recommendOutfitBackFrontTest(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineByAIRequestDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * Python & Back & Front Test Code
     *
     * @param token
     * @param aiRecOutfitCombineRequestDtoList
     * @return AiRecOutfitCombineByAIRequestDto
     */
//    @PostMapping("/combine-python-back-front")
    @PostMapping("/combine")
    public BaseResponse<Object> recommendOutfitTestPythonBackFront(@RequestHeader(value = "accessToken", required = false) String token,
                                                    @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = aiRecOutfitService.recommendOutfitBackPythonFrontTest(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
}
