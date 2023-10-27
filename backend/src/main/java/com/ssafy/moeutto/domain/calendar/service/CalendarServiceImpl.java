package com.ssafy.moeutto.domain.calendar.service;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarRegistRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.request.CalendarScoreRequestDto;
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
     *
     * @param memberId
     * @param requestDto : 요소가 ImageUrl 하나 있음. S3에서 받아와야함.
     */
    @Override
    public void registMyOutfit(UUID memberId, CalendarRegistRequestDto requestDto) throws BaseException {

        Optional<Member> member = memberRepository.findById(memberId);

        if (!member.isPresent()) {
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
     * <p>
     * <p>
     * ToDo : JWT TOKEN 기능 완성되면 연동 후 테스트 필요
     *
     * @param regDate
     * @return
     * @throws BaseException
     */
    @Override
    public CalendarListResponseDto getCalendarList(UUID memberId, Timestamp regDate) throws BaseException {

        // 사용자 재 검증
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));


        //년 월 받아오기.
        Timestamp todayMonth = regDate;

        /* 현재 연월로 캘린더 목록 가져오기 */
        List<Calendar> calendarList = calendarRepository.findAllByMemberIdTodayMonth(memberId, todayMonth).get();

        List<CalendarResponseDto> dairayCalendarList = new ArrayList<>();


        /* 캘린더 정보들 불러와서 리스트에 저장 */
        for (Calendar calendar : calendarList) {
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


    /**
     * 캘린더에 등록된 착장 정보를 삭제하는 서비스입니다.
     *
     * @param memberId
     * @param id
     * @throws BaseException
     */
    @Override
    public void deleteCalendar(UUID memberId, Integer id) throws BaseException {


        /* 사용자 재 검증 */
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        /* 캘린더 존재 여부 */
        calendarRepository.findById(id).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CALENDAR_INFO));

        /* 삭제 */
        calendarRepository.deleteByIdAndMemberId(id, memberId);
    }

    /**
     * 착장에 대한 평가 여부 저장 서비스 입니다.
     * @param memberId
     * @param requestDto
     * @throws BaseException
     */
    @Override
    public void scoreOutfit(UUID memberId, CalendarScoreRequestDto requestDto) throws BaseException {
        //사용자 재 검증
        memberRepository.findById(memberId).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_MEMBER));

        Integer id = requestDto.getId();
        //캘린더 존재 여부
        calendarRepository.findById(id).orElseThrow(() -> new BaseException(BaseResponseStatus.NOT_FOUND_CALENDAR_INFO));

        /* 존재하면 착장 id와 memberId를 기반으로 캘린더 정보 불러오기 */
        Optional<Calendar> calendarOptional = calendarRepository.findByIdAndMemberId(id, memberId);

        /* 기존 존재하는 캘린더 */
        Calendar calendar = calendarOptional.get();

        /* 새로운 객체에 정보 그대로 저장 */
        Calendar calendar1 = calendar.toBuilder()
                .likeOutfit(requestDto.getLikeOutfit())
                .build();

        /* 수정 */
        calendarRepository.save(calendar1);

    }
}
