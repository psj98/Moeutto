package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarScoreRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarRegistResponseDto;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface CalendarService {

    /**
     * 캘린더에 착장을 등록합니다.
     *
     * @param memberId
     * @param token
     * @param file
     * @return CalendarRegistResponseDto
     * @throws BaseException
     */
    CalendarRegistResponseDto registMyOutfit(UUID memberId, String token, MultipartFile file) throws BaseException;

    /**
     * 캘린더 목록을 조회합니다.
     *
     * @param memberId
     * @param regDate
     * @return CalendarListResponseDto
     * @throws BaseException
     */
    CalendarListResponseDto getCalendarList(UUID memberId, String regDate) throws BaseException;

    /**
     * 착장을 삭제합니다.
     *
     * @param memberId
     * @param id
     * @throws BaseException
     */
    void deleteCalendar(UUID memberId, Integer id) throws BaseException;

    /**
     * 캘린더에 점수를 등록합니다.
     *
     * @param memberId
     * @param requestDto
     * @throws BaseException
     */
    void scoreOutfit(UUID memberId, CalendarScoreRequestDto requestDto) throws BaseException;
}
