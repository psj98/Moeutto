package com.ssafy.moeutto.domain.calendar.controller;

import com.ssafy.moeutto.domain.calendar.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
}
