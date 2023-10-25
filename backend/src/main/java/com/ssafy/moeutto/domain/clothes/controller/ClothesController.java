package com.ssafy.moeutto.domain.clothes.controller;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.ClothesRegistResponseDto;
import com.ssafy.moeutto.domain.clothes.service.ClothesService;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {

    private final ClothesService clothesService;
    private final BaseResponseService baseResponseService;

    @PostMapping("/regist")
    public BaseResponse<Object> registClothes(@RequestBody ClothesRegistRequestDto clothesRegistRequestDto) {
        try {
            ClothesRegistResponseDto clothesRegistResponseDto = clothesService.registClothes(clothesRegistRequestDto);
            return baseResponseService.getSuccessResponse(clothesRegistResponseDto);
        } catch (BaseException e) {
            return null;
        }
    }

//    @GetMapping("/{id}")
//    public BaseResponse<Object> getClothes(@PathVariable("id") Integer id) {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/list")
//    public BaseResponse<Object> getListClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @PutMapping("/{id}")
//    public BaseResponse<Object> updateClothes(@PathVariable("id") Integer id) {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @DeleteMapping("/{id}")
//    public BaseResponse<Object> deleteClothes(@PathVariable("id") Integer id) {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/star/{id}")
//    public BaseResponse<Object> starClothes(@PathVariable("id") Integer id) {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-color")
//    public BaseResponse<Object> analysisColorClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-season")
//    public BaseResponse<Object> analysisSeasonClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-frequency")
//    public BaseResponse<Object> analysisFrequencyClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-cost")
//    public BaseResponse<Object> analysisCostClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-amount")
//    public BaseResponse<Object> analysisAmountClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
//
//    @GetMapping("/analysis-use")
//    public BaseResponse<Object> analysisUseClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }
}
