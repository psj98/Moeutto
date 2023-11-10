package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarRegistRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.request.CalendarScoreRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Date;
import java.util.UUID;

public interface CalendarService {

    void registMyOutfit(UUID memberId, String token, MultipartFile file) throws BaseException;

    CalendarListResponseDto getCalendarList(UUID memberId, String regDate) throws BaseException;

    void deleteCalendar(UUID memberId, Integer id) throws BaseException;

    void scoreOutfit(UUID memberId, CalendarScoreRequestDto requestDto) throws BaseException;
}
