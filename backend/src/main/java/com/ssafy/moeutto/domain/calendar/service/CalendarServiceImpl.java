package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarRegistRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarResponseDto;
import com.ssafy.moeutto.domain.calendar.entity.Calendar;
import com.ssafy.moeutto.domain.calendar.repository.CalendarRepository;
import com.ssafy.moeutto.domain.member.entity.Member;
import com.ssafy.moeutto.domain.member.repository.MemberRepository;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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
     * @param requestDto : 요소가 ImageUrl 하나 있음. S3에서 받아와야함.
     */
    @Override
    public void registMyOutfit(UUID memberId,CalendarRegistRequestDto requestDto) throws BaseException {

        Optional<Member> member = memberRepository.findById(memberId);

        if(!member.isPresent()){
            throw new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER);
        }
        Timestamp curDate = Timestamp.valueOf(LocalDateTime.now());

        Calendar calendar =
                Calendar.builder()
                        .memberId(memberId)
                        .imageUrl(requestDto.getImageUrl())
                        .regDate(curDate)
                        .build();


          calendarRepository.save(calendar);

    }

    /**
     * 캘린더를 불러오는 서비스입니다.
     *
     *
     * ToDo : JWT TOKEN 기능 완성되면 연동 후 테스트 필요
     * @param regDate
     * @throws BaseException
     * @return
     */
    @Override
    public CalendarListResponseDto getCalendarList(UUID memberId, Timestamp regDate) throws BaseException {


        Optional<Member> memberOptional = memberRepository.findById(memberId);

        Member member = memberOptional.orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        //년 월 받아오기.
        Timestamp todayMonth = regDate;

        /* 현재 연월로 캘린더 목록 가져오기 */
        List<Calendar> calendarList = calendarRepository.findAllByMemberIdTodayMonth(memberId, todayMonth).get();

        List<CalendarResponseDto> dairayCalendarList = new ArrayList<>();


        /* 캘린더 정보들 불러와서 리스트에 저장 */
        for (Calendar calendar: calendarList) {
            CalendarResponseDto calendarListResponseDto =
                    CalendarResponseDto.builder()
                            .id(calendar.getId())
                            .likeOutfit(calendar.getLikeOutfit())
                            .imageUrl(calendar.getImageUrl())
                            .regDate(calendar.getRegDate())
                            .build();


            dairayCalendarList.add((calendarListResponseDto));
        }

        /* 일기 목록 전달 */
        CalendarListResponseDto calendarListResponseDto = CalendarListResponseDto.builder()
                .calendarList(dairayCalendarList)
                .build();

        return calendarListResponseDto;
    }
}
