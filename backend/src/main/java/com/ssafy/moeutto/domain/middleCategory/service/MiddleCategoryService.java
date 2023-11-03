package com.ssafy.moeutto.domain.middleCategory.service;

import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryByLargeCategoryResponseDto;
import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryDetailResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;

public interface MiddleCategoryService {

    /**
     * 중분류 카테고리 목록을 조회합니다.
     *
     * @return List<MiddleCategoryDetailResponseDto>
     * @throws BaseException
     */
    List<MiddleCategoryDetailResponseDto> getMiddleCategoryList() throws BaseException;

    /**
     * 중분류 카테고리를 조회합니다.
     *
     * @param id
     * @return MiddleCategoryDetailResponseDto
     * @throws BaseException
     */
    MiddleCategoryDetailResponseDto getMiddleCategoryDetail(String id) throws BaseException;

    /**
     * 대분류 카테고리에 해당하는 중분류 카테고리 목록을 조회합니다.
     *
     * @param id
     * @return List<MiddleCategoryByLargeCategoryResponseDto>
     * @throws BaseException
     */
    List<MiddleCategoryByLargeCategoryResponseDto> getMiddleCategoryByLargeCategory(String id) throws BaseException;
}
