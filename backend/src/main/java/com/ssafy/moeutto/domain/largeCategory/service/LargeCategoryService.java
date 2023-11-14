package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;

public interface LargeCategoryService {

    /**
     * 대분류 카테고리 목록을 조회합니다.
     *
     * @return List<LargeCategoryDetailResponseDto> - 대분류 카테고리 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<LargeCategoryDetailResponseDto> getLargeCategoryList() throws BaseException;

    /**
     * 대분류 카테고리를 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return LargeCategoryDetailResponseDto - 대분류 카테고리 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    LargeCategoryDetailResponseDto getLargeCategoryDetail(String id) throws BaseException;
}
