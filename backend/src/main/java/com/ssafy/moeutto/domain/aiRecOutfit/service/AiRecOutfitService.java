package com.ssafy.moeutto.domain.aiRecOutfit.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineClothesListByAIRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.request.AiRecOutfitCombineWeatherByAiRequestDto;
import com.ssafy.moeutto.domain.aiRecOutfit.dto.response.AiRecOutfitCombineListByAIResponseDto;
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
     * Go로 전달할 대분류 카테고리 별 옷 정보 정제
     *
     * @param memberId
     * @return AiRecOutfitCombineClothesListByAIRequestDto
     */
    AiRecOutfitCombineClothesListByAIRequestDto getClothesInfo(UUID memberId) throws BaseException;

    /**
     * Go로 전달할 날씨 정보 정제
     *
     * @param aiRecOutfitCombineRequestDtoList
     * @return List<AiRecOutfitCombineWeatherByAiRequestDto>
     */
    List<AiRecOutfitCombineWeatherByAiRequestDto> getWeatherInfo(List<AiRecOutfitCombineRequestDto> aiRecOutfitCombineRequestDtoList);

    /**
     * Go로 옷 정보 + 날씨 정보 전달 및 추천 데이터 반환
     *
     * @param aiRecOutfitCombineByAIRequestDto
     * @return AiRecOutfitCombineListByAIResponseDto
     * @throws JsonProcessingException
     */
    AiRecOutfitCombineListByAIResponseDto getOutfitByAI(AiRecOutfitCombineByAIRequestDto aiRecOutfitCombineByAIRequestDto) throws JsonProcessingException, BaseException;

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
     * @return List<AiRecOutfitCombineResponseDto>
     */
    List<AiRecOutfitCombineResponseDto> detailAiOutfit(UUID memberId) throws BaseException;
}
