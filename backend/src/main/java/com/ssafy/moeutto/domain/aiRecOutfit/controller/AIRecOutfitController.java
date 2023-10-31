package com.ssafy.moeutto.domain.aiRecOutfit.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AIRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.service.AIRecOutfitService;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.ClothesRegistResponseDto;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ai-rec-outfits")
@RequiredArgsConstructor
public class AIRecOutfitController {

    private final AIRecOutfitService aiRecOutfitService;
    private final BaseResponseService baseResponseService;
    private final AuthTokensGenerator authTokensGenerator;

    @PostMapping("/combine")
    public BaseResponse<Object> recommendOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                                @RequestBody List<AIRecOutfitCombineRequestDto> clothesRegistRequestDto) {
        try {
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            aiRecOutfitService.recommendOutfit(memberId, clothesRegistRequestDto);
            return baseResponseService.getSuccessResponse();
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        } catch (JsonProcessingException e) {
            return baseResponseService.getFailureResponse(BaseResponseStatus.NOT_FOUND_MEMBER);
        }
    }
}
