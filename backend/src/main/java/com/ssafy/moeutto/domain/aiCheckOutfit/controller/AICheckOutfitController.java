package com.ssafy.moeutto.domain.aiCheckOutfit.controller;

import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitClientResponseDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.service.AICheckOutfitService;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai-check-outfits")
@RequiredArgsConstructor
public class AICheckOutfitController {

    private final AICheckOutfitService aiCheckOutfitService;
    private final BaseResponseService baseResponseService;

    @PostMapping("check")
    public BaseResponse<Object> aiCheckOutfit(@RequestHeader(value = "accessToken",required = false) String token,
                                              @RequestBody AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto){

        try {
            AICheckOutfitClientResponseDto aiCheckOutfitClientResponseDto =
                    aiCheckOutfitService.checkOutfit(token, aiCheckOutfitClientRequestDto);

            return baseResponseService.getSuccessResponse(aiCheckOutfitClientResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

}
