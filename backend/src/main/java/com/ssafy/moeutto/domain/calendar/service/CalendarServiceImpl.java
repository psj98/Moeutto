package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import com.ssafy.moeutto.domain.calendar.repository.CalendarRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {

    private final CalendarRepository calendarRepository;
    private final MemberRepository memberRepository;


    /**
     * 캘린더에 착장을 등록하는 서비스입니다.
     * @param memberId
     * @param imageUrl: S3에서 받아와야함.
     */
    @Override
    public void registMyOutfit(UUID memberId, String imageUrl) throws BaseException {


        Optional<Member> member = memberRepository.findById(memberId);

        if(!member.isPresent()){
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER);
        }
        Timestamp curDate = Timestamp.valueOf(LocalDateTime.now());

        Calendar calendar =
                Calendar.builder()
                        .memberId(memberId)
                        .imageUrl(imageUrl)
                        .regDate(curDate)
                        .build();


        calendarRepository.save(calendar);

    }

    /**
     * 캘린더를 불러오는 서비스입니다.
     * @param regDate
     * @return
     */
    @Override
    public CalendarListResponseDto getCalendarList(UUID memberId,Timestamp regDate) throws BaseException {


        Optional<Member> memberOptional = memberRepository.findById(memberId);

        if(!memberOptional.isPresent()){
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER);
        }

        Timestamp todayMonth = regDate;

        /* 현재 년 월로 캘린더 목록 가져오기 */
        List<Calendar> calendarList = calendarRepository.findAllByMemberIdTodayMonth(memberId, regDate).get();

        List<CalendarListResponseDto> dairayCalendarList = new ArrayList<>();

        for (Calendar calendar: calendarList) {


        }







        return new CalendarListResponseDto;
    }
}
