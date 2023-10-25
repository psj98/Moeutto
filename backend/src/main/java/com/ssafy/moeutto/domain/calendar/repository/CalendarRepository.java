package com.ssafy.moeutto.domain.calendar.repository;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {
}
