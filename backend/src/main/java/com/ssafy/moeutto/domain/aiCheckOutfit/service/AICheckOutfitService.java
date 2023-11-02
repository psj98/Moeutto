package com.ssafy.moeutto.domain.aiCheckOutfit.service;

import com.ssafy.moeutto.domain.aiCheckOutfit.dto.request.AICheckOutfitClientRequestDto;
import com.ssafy.moeutto.domain.aiCheckOutfit.dto.response.AICheckOutfitClientResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

public interface AICheckOutfitService {
    /**
     *  AI에게 착장 검사
     *
     * @param aiCheckOutfitClientRequestDto
     * @return AICheckOutfitClientResponseDto
     * @throws BaseException
     */
    AICheckOutfitClientResponseDto checkOutfit(String token, AICheckOutfitClientRequestDto aiCheckOutfitClientRequestDto) throws BaseException;
}
