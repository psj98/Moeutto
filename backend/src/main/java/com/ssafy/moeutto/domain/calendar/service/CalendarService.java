package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;

import java.util.UUID;

public interface CalendarService {

    void registMyOutfit(UUID memberId, String calendar);


}
