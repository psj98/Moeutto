package com.ssafy.moeutto.domain.largeCategory.controller;

import com.ssafy.moeutto.domain.largeCategory.dto.response.LargeCategoryDetailResponseDto;
import com.ssafy.moeutto.domain.largeCategory.service.LargeCategoryService;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/large-categories")
@RequiredArgsConstructor
public class LargeCategoryController {

    private final LargeCategoryService largeCategoryService;
    private final BaseResponseService baseResponseService;

    /**
     * 대분류 카테고리 목록을 조회합니다.
     *
     * @return List<LargeCategoryDetailResponseDto> - 대분류 카테고리 목록
     */
    @GetMapping("/list")
    public BaseResponse<Object> getLargeCategoryList() {
        try {
            List<LargeCategoryDetailResponseDto> largeCategoryDetailResponseDtoList = largeCategoryService.getLargeCategoryList();
            return baseResponseService.getSuccessResponse(largeCategoryDetailResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 대분류 카테고리를 조회합니다.
     *
     * @param id - 대분류 카테고리 id
     * @return LargeCategoryDetailResponseDto - 대분류 카테고리 정보
     */
    @GetMapping("/{id}")
    public BaseResponse<Object> getLargeCategoryDetail(@PathVariable("id") String id) {
        try {
            LargeCategoryDetailResponseDto largeCategoryDetailResponseDto = largeCategoryService.getLargeCategoryDetail(id);
            return baseResponseService.getSuccessResponse(largeCategoryDetailResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
}
