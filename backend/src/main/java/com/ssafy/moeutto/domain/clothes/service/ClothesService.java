package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesUpdateRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface ClothesService {

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto
     * @return ClothesRegistResponseDto
     * @throws BaseException
     */
    ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto, UUID memberId) throws BaseException;

    /**
     * 옷 정보를 조회합니다.
     *
     * @param id
     * @return ClothesDetailResponseDto
     * @throws BaseException
     */
    ClothesDetailResponseDto detailClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷 목록을 조회합니다.
     *
     * @return List<ClothesListResponseDto>
     * @throws BaseException
     */
    List<ClothesListResponseDto> listClothes(UUID memberId) throws BaseException;

    /**
     * 옷 정보를 수정합니다.
     *
     * @param clothesUpdateRequestDto
     * @return ClothesUpdateResponseDto
     * @throws BaseException
     */
    ClothesUpdateResponseDto updateClothes(ClothesUpdateRequestDto clothesUpdateRequestDto, UUID memberId) throws BaseException;

    /**
     * 옷 정보를 해제합니다.
     *
     * @param id
     * @throws BaseException
     */
    void deleteClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷 즐겨찾기를 등록 / 삭제합니다.
     *
     * @param id
     * @return
     * @throws BaseException
     */
    ClothesStarResponseDto starClothes(Integer id) throws BaseException;

    ClothesAnalysisCostResponseDto analysisCost(UUID memberId) throws BaseException;
    ClothesStarResponseDto starClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷장을 색상 기준으로 분석합니다.
     *
     * @return
     * @throws BaseException
     */
    ClothesAnalysisColorResponseDto analysisColor(UUID memberId) throws BaseException;

    /**
     * 옷장을 계절 기준으로 분석합니다.
     *
     * @param memberId
     * @return ClothesAnalysisSeasonResponseDto
     * @throws BaseException
     */
    ClothesAnalysisSeasonResponseDto analysisSeason(UUID memberId) throws BaseException;
}
