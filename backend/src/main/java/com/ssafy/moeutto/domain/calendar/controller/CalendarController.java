package com.ssafy.moeutto.domain.calendar.controller;

import com.ssafy.moeutto.domain.calendar.dto.request.CalendarRegistRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.request.CalendarScoreRequestDto;
import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.service.CalendarService;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.UUID;

@RestController
@RequestMapping("/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final BaseResponseService baseResponseService;
    private final JwtService jwtService;


    /**
     * 캘린더 목록을 불러오는 메서드 입니다.
     *
     * @param token
     * @param curDate
     * @return
     */

    @PostMapping("/list")
    public BaseResponse<Object> calendarList(@RequestHeader(value = "accessToken", required = false) String token,
                                             @RequestBody Timestamp curDate) {
        try {
            UUID memberId = getMemberIdFromToken(token);
            CalendarListResponseDto calendarListResponseDto = calendarService.getCalendarList(memberId, curDate);
            return baseResponseService.getSuccessResponse(calendarListResponseDto);
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }


    /**
     * 캘린더에 착장을 등록하는 메서드 입니다.
     * <p>
     * ToDo - S3에서 이미지 받아오는 부분 수정 해야함.
     *
     * @param token    =  JWT TOKEN
     * @param requestDto = 저장한 착장 사진 전체 ImageUrl을 담고있는 Dto 입니다.
     * @return
     */
    @PostMapping("/regist")
    public BaseResponse<Object> registCalendar(@RequestHeader(value = "accessToken", required = false) String token,
                                               @RequestBody CalendarRegistRequestDto requestDto) {
//         토큰 검증
        try {
            UUID memberId =  getMemberIdFromToken(token);
            calendarService.registMyOutfit(memberId, requestDto);
            return baseResponseService.getSuccessResponse();

        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }


    }


    /**
     * 착장을 삭제하는 컨트롤러입니다.
     *
     * @param token : 사용자 인증 정보 AccessToken
     * @param id    : 착장 ID
     * @return
     * @throws BaseException
     */
    @DeleteMapping("/${id}")
    public BaseResponse<Object> deleteCalendar(@RequestHeader(value = "accessToken", required = false) String token,
                                               @PathVariable("id") Integer id) {
        //토큰 정보로 받은 ID를 기반으로 삭제.
        try {
            UUID memberId =  getMemberIdFromToken(token);
            calendarService. deleteCalendar(memberId, id);
            return baseResponseService.getSuccessResponse();
        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        }
    }

    /**
     * 착장에 대한 사용자의 평가를 위한 컨트롤러 입니다.
     * @param token
     * @param requestDto : 착장 id, 좋아요 종류 0,1,2,3 ...
     * @return
     */
    @PutMapping("/score")
    public BaseResponse<Object> scoreOfMyOutfit (@RequestHeader(value = "accessToken") String token,
                                                 @RequestBody CalendarScoreRequestDto requestDto){
        try{
            UUID memberId = getMemberIdFromToken(token);
            calendarService.scoreOutfit(memberId, requestDto);
            return baseResponseService.getSuccessResponse();
        }catch(BaseException e){
            return baseResponseService.getFailureResponse(e.getStatus());
        }

    }


    /**
     * 토큰 유효성 검사 메서드 입니다.
     * @param token
     * @Todo: 토큰 검증 메서드 JWT Directory 에 추가한 후 메서드 쓰기.
     * @return
     * @throws BaseException
     */
    public UUID getMemberIdFromToken(String token) throws BaseException {
        // 토큰이 null이거나 없으면 세션 만료 메시지 전달
        // 문제 없으면 memberId 반환
        if (token == null || token.equals("")) {
            throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
        }


//        jwtUtil.validToken(token);


        UUID memberIdFromToken = jwtService.getMemberIdFrom;                                                                                                                                                                                                                                                Token(token);
        return memberIdFromToken;

    }


}
