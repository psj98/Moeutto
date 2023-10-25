package com.ssafy.moeutto.domain.largeCategory.service;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.Optional;

public interface LargeCategoryService {

    List<LargeCategoryDetailResponseDto> getLargeCategoryList() throws BaseException;

    LargeCategoryDetailResponseDto getLargeCategoryDetail(String id) throws BaseException;
}
