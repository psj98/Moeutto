package com.ssafy.moeutto.domain.middleCategory.controller;

import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryByLargeCategoryResponseDto;
import com.ssafy.moeutto.domain.middleCategory.dto.response.MiddleCategoryDetailResponseDto;
import com.ssafy.moeutto.domain.middleCategory.service.MiddleCategoryService;
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
@RequestMapping("/middle-categories")
@RequiredArgsConstructor
public class MiddleCategoryController {

    private final MiddleCategoryService middleCategoryService;
    private final BaseResponseService baseResponseService;

    /**
     * 중분류 카테고리 목록을 조회합니다.
     *
     * @return
     */
    @GetMapping("/list")
    public BaseResponse<Object> getMiddleCategoryList() {
        try {
            List<MiddleCategoryDetailResponseDto> middleCategoryDetailResponseDtoList = middleCategoryService.getMiddleCategoryList();
            return baseResponseService.getSuccessResponse(middleCategoryDetailResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 중분류 카테고리를 조회합니다.
     *
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public BaseResponse<Object> getMiddleCategoryDetail(@PathVariable("id") String id) {
        try {
            MiddleCategoryDetailResponseDto middleCategoryDetailResponseDto = middleCategoryService.getMiddleCategoryDetail(id);
            return baseResponseService.getSuccessResponse(middleCategoryDetailResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 대분류 카테고리에 해당하는 중분류 카테고리 목록을 조회합니다.
     *
     * @param id
     * @return
     */
    @GetMapping("/large/{id}")
    public BaseResponse<Object> getMiddleCategoryByLargeCategory(@PathVariable("id") String id) {
        try {
            List<MiddleCategoryByLargeCategoryResponseDto> middleCategoryByLargeCategoryResponseDtoList = middleCategoryService.getMiddleCategoryByLargeCategory(id);
            return baseResponseService.getSuccessResponse(middleCategoryByLargeCategoryResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
}
