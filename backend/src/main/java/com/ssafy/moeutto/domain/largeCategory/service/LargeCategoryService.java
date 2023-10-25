package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.Optional;

public interface LargeCategoryService {

    /**
     * 대분류 카테고리 목록을 조회합니다.
     *
     * @return List<LargeCategoryDetailResponseDto>
     * @throws BaseException
     */
    List<LargeCategoryDetailResponseDto> getLargeCategoryList() throws BaseException;

    /**
     * 대분류 카테고리를 조회합니다.
     *
     * @param id
     * @return LargeCategoryDetailResponseDto
     * @throws BaseException
     */
    LargeCategoryDetailResponseDto getLargeCategoryDetail(String id) throws BaseException;
}
