package com.ssafy.moeutto.domain.guestBook.controller;

import com.ssafy.moeutto.domain.guestBook.dto.request.GuestBookRegistRequestDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookListResponseDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookRegistResponseDto;
import com.ssafy.moeutto.domain.guestBook.service.GuestBookService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/guestbooks")
@RequiredArgsConstructor
public class GuestBookController {

    private final GuestBookService guestBookService;
    private final BaseResponseService baseResponseService;
    private final AuthTokensGenerator authTokensGenerator;

    /**
     * 방명록을 등록합니다.
     *
     * @param token                     - accessToken
     * @param guestBookRegistRequestDto - 방명록에 등록할 정보
     * @return GuestBookRegistResponseDto - 방명록에 등록된 정보
     */
    @PostMapping("")
    public BaseResponse<Object> registGuestBook(@RequestHeader(value = "accessToken", required = false) String token,
                                                @RequestBody GuestBookRegistRequestDto guestBookRegistRequestDto) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            // 방명록 등록
            GuestBookRegistResponseDto guestBookRegistResponseDto = guestBookService.registGuestBook(memberId, guestBookRegistRequestDto);
            return baseResponseService.getSuccessResponse(guestBookRegistResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 옷장을 조회할 때, 사용자 id에 따른 방명록 목록을 반환합니다.
     *
     * @param token - accessToken
     * @return List<GuestBookListResponseDto> - 방명록 목록 정보
     */
    @GetMapping("")
    public BaseResponse<Object> listGuestBook(@RequestHeader(value = "accessToken", required = false) String token) {
        try {
            // 토큰 정보 체크
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }

            UUID memberId = authTokensGenerator.extractMemberId(token); // 사용자 체크

            // 방명록 등록
            List<GuestBookListResponseDto> guestBookListResponseDtoList = guestBookService.listGuestBook(memberId);
            return baseResponseService.getSuccessResponse(guestBookListResponseDtoList);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }
}
