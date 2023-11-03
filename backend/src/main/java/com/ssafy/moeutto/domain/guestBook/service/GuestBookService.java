package com.ssafy.moeutto.domain.guestBook.service;

import com.ssafy.moeutto.domain.guestBook.dto.request.GuestBookRegistRequestDto;
import com.ssafy.moeutto.domain.guestBook.dto.response.GuestBookRegistResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

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
}
