package com.ssafy.moeutto.domain.guestBook.controller;

import com.ssafy.moeutto.domain.guestBook.dto.request.GuestBookRegistRequestDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookRegistResponseDto;
import com.ssafy.moeutto.domain.guestBook.service.GuestBookService;
import com.ssafy.moeutto.domain.member.auth.AuthTokensGenerator;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
     * @param token
     * @param guestBookRegistRequestDto
     * @return
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
}
