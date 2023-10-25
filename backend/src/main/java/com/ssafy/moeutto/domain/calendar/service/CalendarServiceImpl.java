package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import com.ssafy.moeutto.domain.calendar.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository calendarRepository;

    @Override
    public void registMyOutfit(UUID memberId, String imageUrl) {


        Calendar calendar =
                Calendar.builder()
                        .memberId(memberId)
                        .imageUrl(imageUrl)
                        .regDate(LocalDateTime.now())
                        .build();


        calendarRepository.save(calendar);

    }
}
