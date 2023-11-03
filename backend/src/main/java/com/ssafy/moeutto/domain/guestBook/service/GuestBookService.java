package com.ssafy.moeutto.domain.guestBook.service;

import com.ssafy.moeutto.domain.guestBook.dto.request.GuestBookRegistRequestDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookListResponseDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookRegistResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;
import java.util.UUID;

public interface GuestBookService {

    /**
     * 방명록을 등록합니다.
     *
     * @param memberId
     * @param guestBookRegistRequestDto
     * @return GuestBookRegistResponseDto
     */
    GuestBookRegistResponseDto registGuestBook(UUID memberId, GuestBookRegistRequestDto guestBookRegistRequestDto) throws BaseException;

    /**
     * 옷장을 조회할 때, 사용자 id에 따른 방명록 목록을 반환합니다.
     *
     * @param memberId
     * @return List<GuestBookListResponseDto>
     * @throws BaseException
     */
    List<GuestBookListResponseDto> listGuestBook(UUID memberId) throws BaseException;
}
