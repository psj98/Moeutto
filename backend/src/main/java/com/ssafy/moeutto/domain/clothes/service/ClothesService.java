package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesListRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesUpdateRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
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
     * @param memberId
     * @param clothesListRequestDto
     * @return List<ClothesListResponseDto>
     * @throws BaseException
     */
    List<ClothesListResponseDto> listClothes(UUID memberId, ClothesListRequestDto clothesListRequestDto) throws BaseException;

    /**
     * 사용자 id로 목록을 조회합니다.
     *
     * @param memberId
     * @param sortBy
     * @param orderBy
     * @return List<Clothes>
     */
    List<Clothes> listClothesAll(UUID memberId, String sortBy, Integer orderBy);

    /**
     * 사용자 id와 대분류 카테고리 id로 목록을 조회합니다.
     *
     * @param memberId
     * @param categoryId
     * @param sortBy
     * @param orderBy
     * @return List<Clothes>
     */
    List<Clothes> listClothesByLargeCategoryId(UUID memberId, String categoryId, String sortBy, Integer orderBy);

    /**
     * 사용자 id와 중분류 카테고리 id로 목록을 조회합니다.
     *
     * @param memberId
     * @param categoryId
     * @param sortBy
     * @param orderBy
     * @return List<Clothes>
     */
    List<Clothes> listClothesByMiddleCategoryId(UUID memberId, String categoryId, String sortBy, Integer orderBy);

    /**
     * 조회한 목록에서 필요한 속성을 추출합니다.
     *
     * @param clothesList
     * @return List<ClothesListResponseDto>
     */
    List<ClothesListResponseDto> getClothesListResponseDto(List<Clothes> clothesList);

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
     * @return ClothesStarResponseDto
     * @throws BaseException
     */
    ClothesStarResponseDto starClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷장을 색상 기준으로 분석합니다.
     *
     * @return ClothesAnalysisColorResponseDto
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

    /**
     * 옷장을 빈도 기준으로 분석합니다.
     *
     * @param memberId
     * @return ClothesAnalysisFrequencyResponseDto
     * @throws BaseException
     */
    ClothesAnalysisFrequencyResponseDto analysisFrequency(UUID memberId) throws BaseException;

    /**
     * 옷장을 가격 기준으로 분석합니다.
     *
     * @param memberId
     * @return ClothesAnalysisCostResponseDto
     * @throws BaseException
     */
    ClothesAnalysisCostResponseDto analysisCost(UUID memberId) throws BaseException;


    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param memberId
     * @return ClothesAnalysisMinMaxResponseDto
     * @throws BaseException
     */
    ClothesAnalysisMinMaxResponseDto analysisAmount(UUID memberId) throws BaseException;
}
