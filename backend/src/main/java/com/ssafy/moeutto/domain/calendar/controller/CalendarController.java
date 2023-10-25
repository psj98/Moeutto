package com.ssafy.moeutto.domain.calendar.controller;

import com.ssafy.moeutto.domain.calendar.dto.response.CalendarListResponseDto;
import com.ssafy.moeutto.domain.calendar.service.CalendarService;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import com.ssafy.moeutto.global.response.BaseResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final BaseResponseService baseResponseService;
    private final JwtService jwtService;



    @PostMapping("/list")
    public BaseResponse<Object> calendarList(@RequestHeader(value = "accessToken", required = false) String token,
                                             @RequestBody Timestamp curDate){

        try{

            if(token == null || token.equals("")){
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }


            UUID memberId = jwtService.getMemberIdFromToken(token);
            CalendarListResponseDto calendarListResponseDto = calendarService.getCalendarList(memberId, curDate);
            return baseResponseService.getSuccessResponse()
        }catch (BaseException e){
            return baseResponseService.getFailureResponse(e.status);
        }
    }




    /**
     * 캘린더에 착장을 등록하는 컨트롤러 입니다.
     *
     * ToDo - S3에서 이미지 받아오는 부분 수정 해야함.
     * @param token =  JWT TOKEN
     * @param imageUrl = 저장한 착장 사진 전체 ImageUrl 입니다.
     * @return
     */
    @PostMapping("/regist")
    public BaseResponse<Object> registMyOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                               @RequestBody String imageUrl){
//         토큰 검증
        try{
            if (token == null || token.equals("")) {
                throw new BaseException(BaseResponseStatus.SESSION_EXPIRATION);
            }
                UUID memberIdFromToken = jwtService.getMemberIdFromToken(token);

                calendarService.registMyOutfit(memberIdFromToken, imageUrl);


            return baseResponseService.getSuccessResponse();

        }catch(BaseException e){
            return baseResponseService.getFailureResponse(e.status);
        }


    }


}
