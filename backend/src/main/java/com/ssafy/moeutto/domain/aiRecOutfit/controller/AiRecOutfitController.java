package com.ssafy.moeutto.domain.aiRecOutfit.controller;

import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
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
    public BaseResponse<Object> recommendOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                                @RequestBody List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

//            aiRecOutfitService.recommendOutfit(memberId, aiRecOutfitCombineRequestDtoList);
            AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto = aiRecOutfitService.recommendOutfitTest(memberId, aiRecOutfitCombineRequestDtoList);
            return baseResponseService.getSuccessResponse(aiRecOutfitCombineByAIRequestDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
//        catch (JsonProcessingException e) {
//            return baseResponseService.getFailureResponse(BaseResponseStatus.NOT_FOUND_MEMBER);
//        }
    }
}
