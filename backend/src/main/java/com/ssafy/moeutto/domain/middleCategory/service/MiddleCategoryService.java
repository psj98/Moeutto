package com.ssafy.moeutto.domain.middleCategory.service;

import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryByLargeCategoryResponseDto;
import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryDetailResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;

public interface MiddleCategoryService {

    /**
     * 중분류 카테고리 목록을 조회합니다.
     *
     * @return List<MiddleCategoryDetailResponseDto> - 중분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<MiddleCategoryDetailResponseDto> getMiddleCategoryList() throws BaseException;

    /**
     * 중분류 카테고리를 조회합니다.
     *
     * @param id - 중분류 카테고리 id
     * @return MiddleCategoryDetailResponseDto - 중분류 카테고리 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    MiddleCategoryDetailResponseDto getMiddleCategoryDetail(String id) throws BaseException;

    /**
     * 대분류 카테고리에 해당하는 중분류 카테고리 목록을 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return List<MiddleCategoryByLargeCategoryResponseDto> - 대분류 카테고리에 해당하는 중분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<MiddleCategoryByLargeCategoryResponseDto> getMiddleCategoryByLargeCategory(String id) throws BaseException;
}
