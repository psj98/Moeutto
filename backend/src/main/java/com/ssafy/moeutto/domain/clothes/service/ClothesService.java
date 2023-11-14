package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.*;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface ClothesService {

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto - 옷 등록 정보
     * @param memberId                - 사용자 UUID
     * @param token                   - accessToken
     * @param file                    - 옷 이미지
     * @return ClothesRegistResponseDto - 등록된 옷 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto, UUID memberId, String token, MultipartFile file) throws BaseException;

    /**
     * 옷 정보를 조회합니다.
     *
     * @param id       - 옷 정보 id
     * @param memberId - 사용자 UUID
     * @return ClothesDetailResponseDto - 옷 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesDetailResponseDto detailClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷 목록을 조회합니다.
     *
     * @param memberId              - 사용자 UUID
     * @param clothesListRequestDto - 옷 정렬 기준 정보
     * @return List<ClothesListResponseDto> - 옷 목록 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    List<ClothesListResponseDto> listClothes(UUID memberId, ClothesListRequestDto clothesListRequestDto) throws BaseException;

    /**
     * 옷 목록과 방명록을 가져옵니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesListAndGuestBookResponseDto - 옷 목록 + 방명록 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesListAndGuestBookResponseDto listClothesAndGuestBooks(UUID memberId) throws BaseException;

    /**
     * 사용자 id로 목록을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @param sortBy   - 정렬 기준
     * @param orderBy  - 오름차순 / 내림차순
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> listClothesAll(UUID memberId, String sortBy, Integer orderBy);

    /**
     * 사용자 id와 대분류 카테고리 id로 목록을 조회합니다.
     *
     * @param memberId   - 사용자 UUID
     * @param categoryId - 대분류 카테고리 id
     * @param sortBy     - 정렬 기준
     * @param orderBy    - 오름차순 / 내림차순
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> listClothesByLargeCategoryId(UUID memberId, String categoryId, String sortBy, Integer orderBy);

    /**
     * 사용자 id와 중분류 카테고리 id로 목록을 조회합니다.
     *
     * @param memberId   - 사용자 UUID
     * @param categoryId - 중분류 카테고리 id
     * @param sortBy     - 정렬 기준
     * @param orderBy    - 오름차순 / 내림차순
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> listClothesByMiddleCategoryId(UUID memberId, String categoryId, String sortBy, Integer orderBy);

    /**
     * 조회한 목록에서 필요한 속성을 추출합니다.
     *
     * @param clothesList - 옷 목록 정보
     * @return List<ClothesListResponseDto> - 반환할 옷 목록 정보
     */
    List<ClothesListResponseDto> getClothesListResponseDto(List<Clothes> clothesList);

    /**
     * 옷 정보를 수정합니다.
     *
     * @param clothesUpdateRequestDto - 옷 수정 정보
     * @param memberId                - 사용자 UUID
     * @param token                   - accessToken
     * @param file                    - 옷 이미지
     * @return ClothesUpdateResponseDto - 수정된 옷 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesUpdateResponseDto updateClothes(ClothesUpdateRequestDto clothesUpdateRequestDto, UUID memberId, String token, MultipartFile file) throws BaseException;

    /**
     * 옷 정보를 삭제합니다.
     *
     * @param id       - 옷 정보 id
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷 즐겨찾기를 등록 / 삭제합니다.
     *
     * @param id       - 옷 정보 id
     * @param memberId - 사용자 UUID
     * @return ClothesStarResponseDto - 옷 즐겨찾기 여부 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesStarResponseDto starClothes(Integer id, UUID memberId) throws BaseException;

    /**
     * 옷장을 색상 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisColorResponseDto - 옷 색상 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisColorResponseDto analysisColor(UUID memberId) throws BaseException;

    /**
     * 옷장을 계절 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisSeasonResponseDto - 옷 계절 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisSeasonResponseDto analysisSeason(UUID memberId) throws BaseException;

    /**
     * 옷장을 빈도 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisFrequencyResponseDto - 옷 빈도 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisFrequencyResponseDto analysisFrequency(UUID memberId) throws BaseException;

    /**
     * 옷장을 가격 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisCostResponseDto - 옷 가격 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisCostResponseDto analysisCost(UUID memberId) throws BaseException;


    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisMinMaxResponseDto - 옷 미니멀 / 맥시멀 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisMinMaxResponseDto analysisAmount(UUID memberId) throws BaseException;

    /**
     * 옷장을 활용도 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return ClothesAnalysisAvailabilityResponseDto - 옷 활용도 분석 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesAnalysisAvailabilityResponseDto analysisAvailability(UUID memberId) throws BaseException;

    /**
     * 친구가 소유한 옷 목록을 조회합니다.
     *
     * @param memberId                       - 사용자 UUID
     * @param clothesListByFriendsRequestDto - 친구 이메일 + 옷 목록 정렬 기준 정보
     * @return List<ClothesListByFriendsResponseDto> - 친구가 소유한 옷 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<ClothesListResponseDto> getListByFriends(UUID memberId, ClothesListByFriendsRequestDto clothesListByFriendsRequestDto) throws BaseException;

    /**
     * 친구가 소유한 옷 목록과 방명록을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @param email    - 친구 이메일
     * @return ClothesListAndGuestBookResponseDto - 친구 옷 목록 + 방명록 목록 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    ClothesListAndGuestBookResponseDto getListClothesAndGuestBookByFriends(UUID memberId, String email) throws BaseException;
}
