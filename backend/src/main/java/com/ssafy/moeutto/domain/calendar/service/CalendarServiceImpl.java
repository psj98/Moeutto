package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl {

    private final CalendarRepository calendarRepository;
}
