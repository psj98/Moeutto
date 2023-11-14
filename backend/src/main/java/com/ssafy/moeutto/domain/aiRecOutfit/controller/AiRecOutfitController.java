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
    @PostMapping("/combine")
    public BaseResponse<Object> recommendAiOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                                  @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = aiRecOutfitService.recommendAiOutfit(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        } catch (JsonProcessingException e) {
            return baseResponseService.getFailureResponse(BaseResponseStatus.JSON_PARSE_ERROR);
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
    public BaseResponse<Object> recommendAiOutfitTest(@RequestHeader(value = "accessToken", required = false) String token,
                                                      @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = aiRecOutfitService.recommendAiOutfitBackFrontTest(memberId, aiRecOutfitCombineRequestDtoList);
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
    @PostMapping("/combine-front")
    public BaseResponse<Object> recommendAiOutfitTestPythonBackFront(@RequestHeader(value = "accessToken", required = false) String token,
                                                                     @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = aiRecOutfitService.recommendAiOutfitBackPythonFrontTest(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 현재 날짜 기준으로 AI가 추천한 착장을 조회합니다.
     *
     * @param token
     * @return List<AiRecOutfitCombineResponseDto>
     */
    @GetMapping("")
    public BaseResponse<Object> detailAiOutfit(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<AiRecOutfitCombineResponseDto> aiRecOutfitCombineResponseDtoList = aiRecOutfitService.detailAiOutfit(memberId);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
}
