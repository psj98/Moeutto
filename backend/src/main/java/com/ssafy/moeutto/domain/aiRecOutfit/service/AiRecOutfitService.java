package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface AiRecOutfitService {

    /**
     * AI가 날씨에 따라 착장을 추천해줍니다.
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AIRecOutfitCombineResponseDto>
     */
    List<AiRecOutfitCombineResponseDto> recommendAiOutfit(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException, JsonProcessingException;

    /**
     * Client & Back 테스트 코드
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return AiRecOutfitCombineByAIRequestDto
     * @throws BaseException
     */
    AiRecOutfitCombineByAIRequestDto recommendAiOutfitBackFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException;

    /**
     * Python & Back & Front Test Code
     *
     * @param memberId
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AiRecOutfitCombineResponseDto>
     * @throws BaseException
     */
    List<AiRecOutfitCombineResponseDto> recommendAiOutfitBackPythonFrontTest(UUID memberId, List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList) throws BaseException;

    /**
     * 현재 날짜 기준으로 AI가 추천한 착장을 조회합니다.
     *
     * @param memberId
     * @return
     */
    List<AiRecOutfitCombineResponseDto> detailAiOutfit(UUID memberId) throws BaseException;
}
