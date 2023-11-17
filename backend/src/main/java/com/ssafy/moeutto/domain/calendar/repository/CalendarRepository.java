package com.ssafy.moeutto.domain.calendar.repository;

import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CalendarRepository extends JpaRepository<Calendar, Integer> {

    @Query(value = "SELECT * FROM calendar " +
            "WHERE member_id = ?1 " +
            "AND DATE_FORMAT(reg_date, '%Y-%m') = DATE_FORMAT(?2, '%Y-%m') ", nativeQuery = true)
    Optional<List<Calendar>> findAllByMemberIdTodayMonth(UUID memberId, String regDate);

    /**
     * memberId와 착장 id를 기반으로 삭제
     *
     * @param memberId
     * @param id       : 착장 Id
     */
    Optional<Calendar> findByIdAndMemberId(Integer id, UUID memberId);

    /**
     * 사용자 ID + 날짜로 캘린더 존재 여부 체크
     *
     * @param memberId
     * @param regDate
     * @return Optional<Calendar>
     */
    Optional<Calendar> findByMemberIdAndRegDate(UUID memberId, Date regDate);

    /**
     * 사용자 UUID로 캘린더를 삭제합니다.
     *
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByMemberId(UUID memberId) throws BaseException;
}
