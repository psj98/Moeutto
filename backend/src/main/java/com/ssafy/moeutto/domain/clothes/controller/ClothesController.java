package com.ssafy.moeutto.domain.clothes.controller;

import com.ssafy.moeutto.domain.clothes.dto.request.*;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.domain.clothes.service.ClothesService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
     * @param token                   - accessToken
     * @param clothesRegistRequestDto - 옷 등록 데이터 Dto
     * @param file                    - 옷 이미지
     * @return ClothesRegistResponseDto - 옷 등록 정보
     */
    @PostMapping("/regist")
    public BaseResponse<Object> registClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @RequestPart("clothesRegistRequestDto") ClothesRegistRequestDto clothesRegistRequestDto,
                                              @RequestPart("file") MultipartFile file) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 정보 등록
            ClothesRegistResponseDto clothesRegistResponseDto = clothesService.registClothes(clothesRegistRequestDto, memberId, token, file);
            return baseResponseService.getSuccessResponse(clothesRegistResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 조회합니다.
     *
     * @param id - 옷 정보 id
     * @return ClothesDetailResponseDto - 옷 조회 정보
     */
    @GetMapping("/{id}")
    public BaseResponse<Object> getClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                           @PathVariable("id") Integer id) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 정보 조회
            ClothesDetailResponseDto clothesDetailResponseDto = clothesService.detailClothes(id, memberId);
            return baseResponseService.getSuccessResponse(clothesDetailResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 목록을 조회합니다.
     *
     * @param token                 - accessToken
     * @param clothesListRequestDto - 옷 목록을 조회할 기준 Dto
     * @return List<ClothesListResponseDto> - 옷 목록 정보
     */
    @PostMapping("/list")
    public BaseResponse<Object> getListClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                               @RequestBody ClothesListRequestDto clothesListRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 목록 조회
            List<ClothesListResponseDto> clothesListResponseDtoList = clothesService.listClothes(memberId, clothesListRequestDto);
            return baseResponseService.getSuccessResponse(clothesListResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 목록 + 방명록 가져오기
     *
     * @param token - accessToken
     * @return ClothesListAndGuestBookResponseDto - 옷 목록 + 방명록 정보
     */
    @GetMapping("/list-all")
    public BaseResponse<Object> getListClothesAndGuestBooks(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 목록 + 방명록 조회
            ClothesListAndGuestBookResponseDto clothesListAndGuestBookResponseDto = clothesService.listClothesAndGuestBooks(memberId);
            return baseResponseService.getSuccessResponse(clothesListAndGuestBookResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 수정합니다.
     *
     * @param token                   - accessToken
     * @param clothesUpdateRequestDto - 옷 수정 정보
     * @param file                    - 옷 이미지
     * @return ClothesUpdateResponseDto - 수정된 옷 정보
     */
    @PutMapping("")
    public BaseResponse<Object> updateClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @RequestPart ClothesUpdateRequestDto clothesUpdateRequestDto,
                                              @RequestPart("file") MultipartFile file) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 정보 수정
            ClothesUpdateResponseDto clothesUpdateResponseDto = clothesService.updateClothes(clothesUpdateRequestDto, memberId, token, file);
            return baseResponseService.getSuccessResponse(clothesUpdateResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 정보를 삭제합니다.
     *
     * @param token - accessToken
     * @param id    - 옷 정보 id
     * @return BaseResponse
     */
    @DeleteMapping("/{id}")
    public BaseResponse<Object> deleteClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                              @PathVariable("id") Integer id) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 정보 삭제
            clothesService.deleteClothes(id, memberId);
            return baseResponseService.getSuccessResponse();
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷 즐겨찾기를 등록 / 해제합니다.
     *
     * @param token - accessToken
     * @param id    - 옷 정보 id
     * @return ClothesStarResponseDto - 옷 즐겨찾기 정보
     */
    @GetMapping("/star/{id}")
    public BaseResponse<Object> starClothes(@RequestHeader(value = "accessToken", required = false) String token,
                                            @PathVariable("id") Integer id) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 옷 즐겨찾기 등록 / 해제
            ClothesStarResponseDto clothesStarResponseDto = clothesService.starClothes(id, memberId);
            return baseResponseService.getSuccessResponse(clothesStarResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 색상 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisColorResponseDto - 색상 기준 분석 정보
     */
    @GetMapping("/analysis-color")
    public BaseResponse<Object> analysisColorClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 색상 기준으로 분석
            ClothesAnalysisColorResponseDto clothesAnalysisColorResponseDto = clothesService.analysisColor(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisColorResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 계절 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisSeasonResponseDto - 계절 기준 분석 정보
     */
    @GetMapping("/analysis-season")
    public BaseResponse<Object> analysisSeasonClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 계절 기준으로 분석
            ClothesAnalysisSeasonResponseDto clothesAnalysisSeasonResponseDto = clothesService.analysisSeason(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisSeasonResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 빈도 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisFrequencyResponseDto - 빈도 기준 분석 정보
     */
    @GetMapping("/analysis-frequency")
    public BaseResponse<Object> analysisFrequencyClothes(@RequestHeader(value = "accessToken", required = false) String token) {

        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 빈도 기준으로 분석
            ClothesAnalysisFrequencyResponseDto clothesAnalysisFrequencyResponseDto = clothesService.analysisFrequency(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisFrequencyResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 가격 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisCostResponseDto - 가격 기준 분석 정보
     */
    @GetMapping("/analysis-cost")
    public BaseResponse<Object> analysisCostClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 가격 기준으로 분석
            ClothesAnalysisCostResponseDto responseDto = clothesService.analysisCost(memberId);
            return baseResponseService.getSuccessResponse(responseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.getStatus());
        }
    }

    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisMinMaxResponseDto - 미니멀 / 맥시멀 기준 분석 정보
     */
    @GetMapping("/analysis-amount")
    public BaseResponse<Object> analysisAmountClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 미니멀 / 맥시멀 기준으로 분석
            ClothesAnalysisMinMaxResponseDto clothesAnalysisMinMaxResponseDto = clothesService.analysisAmount(memberId);
            return baseResponseService.getSuccessResponse(clothesAnalysisMinMaxResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 활용도 기준으로 분석합니다.
     *
     * @param token - accessToken
     * @return ClothesAnalysisAvailabilityResponseDto - 활용도 기준 분석 정보
     */
    @GetMapping("/analysis-use")
    public BaseResponse<Object> analysisUseClothes(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 활용도 기준으로 분석
            ClothesAnalysisAvailabilityResponseDto responseDto = clothesService.analysisAvailability(memberId);
            return baseResponseService.getSuccessResponse(responseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 친구가 소유한 옷 목록을 조회합니다.
     *
     * @param token                          - accessToken
     * @param clothesListByFriendsRequestDto - 친구 이메일 + 옷 정렬 기준 정보
     * @return List<ClothesListResponseDto> - 친구 옷 목록 정보
     */
    @PostMapping("/list/friend")
    public BaseResponse<Object> getListByFriends(@RequestHeader(value = "accessToken", required = false) String token,
                                                 @RequestBody ClothesListByFriendsRequestDto clothesListByFriendsRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 친구 옷 목록 조회
            List<ClothesListResponseDto> clothesServiceListByFriends = clothesService.getListByFriends(memberId, clothesListByFriendsRequestDto);
            return baseResponseService.getSuccessResponse(clothesServiceListByFriends);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 친구가 소유한 옷 목록과 방명록을 조회합니다.
     *
     * @param token                                      - accessToken
     * @param clothesListAndGuestBookByFriendsRequestDto - 친구 이메일 정보
     * @return ClothesListAndGuestBookResponseDto - 친구가 소유한 옷 목록 + 방명록 정보
     */
    @PostMapping("/list/friend-all")
    public BaseResponse<Object> getListClothesAndGuestBookByFriends(@RequestHeader(value = "accessToken", required = false) String token,
                                                                    @RequestBody ClothesListAndGuestBookByFriendsRequestDto clothesListAndGuestBookByFriendsRequestDto) {
        try {
            UUID memberId = getMemberIdFromToken(token); // 사용자 체크

            // 친구 옷 목록 + 방명록 조회
            ClothesListAndGuestBookResponseDto clothesListAndGuestBookResponseDtoByFriend = clothesService.getListClothesAndGuestBookByFriends(memberId, clothesListAndGuestBookByFriendsRequestDto.getEmail());
            return baseResponseService.getSuccessResponse(clothesListAndGuestBookResponseDtoByFriend);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * accessToken으로 사용자 정보를 체크합니다.
     *
     * @param token - accessToken
     * @return UUID - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    public UUID getMemberIdFromToken(String token) throws BaseException {
        // 토큰 정보 체크
        if (token == null || token.equals("")) {
            throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
        }

        return authTokensGenerator.extractMemberId(token);
    }
}
