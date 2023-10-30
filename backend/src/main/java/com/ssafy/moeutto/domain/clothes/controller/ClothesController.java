package com.ssafy.moeutto.domain.clothes.controller;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesUpdateRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.domain.clothes.service.ClothesService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/clothes")
@RequiredArgsConstructor
public class ClothesController {

    private final ClothesService clothesService;
    private final BaseResponseService baseResponseService;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto
     * @return ClothesRegistResponseDto
     */
    @PostMapping("/regist")
    public BaseResponse<Object> registClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @RequestBody ClothesRegistRequestDto clothesRegistRequestDto) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesRegistResponseDto clothesRegistResponseDto = clothesService.registClothes(clothesRegistRequestDto, memberId);
            return baseResponseService.getSuccessResponse(clothesRegistResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 조회합니다.
     *
     * @param id
     * @return ClothesDetailResponseDto
     */
    @GetMapping("/{id}")
    public BaseResponse<Object> getClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                           @PathVariable("id") Integer id) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesDetailResponseDto clothesDetailResponseDto = clothesService.detailClothes(id, memberId);
            return baseResponseService.getSuccessResponse(clothesDetailResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 목록을 조회합니다.
     *
     * @return
     */
    @GetMapping("/list")
    public BaseResponse<Object> getListClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            List<ClothesListResponseDto> clothesListResponseDtoList = clothesService.listClothes(memberId);
            return baseResponseService.getSuccessResponse(clothesListResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 수정합니다.
     *
     * @param clothesUpdateRequestDto
     * @return ClothesUpdateResponseDto
     */
    @PutMapping("")
    public BaseResponse<Object> updateClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @RequestBody ClothesUpdateRequestDto clothesUpdateRequestDto) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesUpdateResponseDto clothesUpdateResponseDto = clothesService.updateClothes(clothesUpdateRequestDto, memberId);
            return baseResponseService.getSuccessResponse(clothesUpdateResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 삭제합니다.
     *
     * @param id
     * @return
     */
    @DeleteMapping("/{id}")
    public BaseResponse<Object> deleteClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @PathVariable("id") Integer id) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            clothesService.deleteClothes(id, memberId);
            return baseResponseService.getSuccessResponse();
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 즐겨찾기를 등록 / 해제합니다.
     *
     * @param id
     * @return ClothesStarResponseDto
     */
    @GetMapping("/star/{id}")
    public BaseResponse<Object> starClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                            @PathVariable("id") Integer id) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesStarResponseDto clothesStarResponseDto = clothesService.starClothes(id, memberId);
            return baseResponseService.getSuccessResponse(clothesStarResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 색상 기준으로 분석합니다.
     *
     * @param token
     * @return ClothesAnalysisColorResponseDto
     */
    @GetMapping("/analysis-color")
    public BaseResponse<Object> analysisColorClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesAnalysisColorResponseDto clothesAnalysisColorResponseDto = clothesService.analysisColor(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisColorResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 계절 기준으로 분석합니다.
     *
     * @param token
     * @return ClothesAnalysisSeasonResponseDto
     */
    @GetMapping("/analysis-season")
    public BaseResponse<Object> analysisSeasonClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            // 계절 기준으로 분석
            ClothesAnalysisSeasonResponseDto clothesAnalysisSeasonResponseDto = clothesService.analysisSeason(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisSeasonResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    @GetMapping("/analysis-frequency")
    public BaseResponse<Object> analysisFrequencyClothes(@RequestHeader(value = "accessToken", required = false) String token) {

        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            ClothesAnalysisFrequencyResponseDto clothesAnalysisFrequencyResponseDto = clothesService.analysisFrequency(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisFrequencyResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
//
//    @GetMapping("/analysis-cost")
//    public BaseResponse<Object> analysisCostClothes() {
//        try {
//            return null;
//        } catch (BaseException e) {
//            return null;
//        }
//    }

    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param token
     * @return ClothesAnalysisMinMaxResponseDto
     */
    @GetMapping("/analysis-amount")
    public BaseResponse<Object> analysisAmountClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            // 미니멀 / 맥시멀 기준으로 분석
            ClothesAnalysisMinMaxResponseDto clothesAnalysisMinMaxResponseDto = clothesService.analysisAmount(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisMinMaxResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
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
