package com.ssafy.moeutto.domain.calendar.repository;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {


    @Query(value = "SELECT * FROM calendar " + "WHERE member_id = ?1 AND DATE_FORMAT(curDate, '%Y-%m')= DATE_FORMAT(?2, '%Y-%m')", nativeQuery = true)
    Optional<List<Calendar>> findAllByMemberIdTodayMonth(UUID memberId, Timestamp curDate);

    /**
     * memberId와 착장 id를 기반으로 삭제
     * @param memberId
     * @param id : 착장 Id
     */
    void deleteByIdAndMemberId(UUID memberId, Integer id);
}
