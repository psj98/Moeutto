package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarRegistRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.request.CalendarScoreRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import com.ssafy.moeutto.global.response.BaseException;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.UUID;

public interface CalendarService {

    void registMyOutfit(UUID memberId,CalendarRegistRequestDto requestDto) throws BaseException;;
    CalendarListResponseDto getCalendarList(UUID memberId, Timestamp curDate) throws BaseException;

    void deleteCalendar(UUID memberId, Integer id) throws BaseException;

    void scoreOutfit(UUID memberId, CalendarScoreRequestDto requestDto) throws BaseException;
}
