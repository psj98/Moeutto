package com.ssafy.moeutto.domain.calendar.controller;

import com.ssafy.moeutto.domain.calendar.service.CalendarService;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/calendars")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;
    private final BaseResponseService baseResponseService;
    private final JwtService jwtService;


    /**
     * 캘린더에 착장을 등록하는 컨트롤러 업니다.
     * @param token =  JWT TOKEN
     * @param clothes = 착장 정보 ( 착장 ID 얻기용)
     * @return
     */
    @PostMapping("/regist")
    public BaseResponse<Object> registMyOutfit(@RequestHeader(value = "accessToken", required = false) String token,
                                               @RequestBody String imageUrl){

//         토큰 검증
        try{
            if(token != null && !token.equals("")){
//                 로그인 한 유저인지?
//                 로그인 한 유저면 토큰에서 아이디 따오기
//                Integer clothId = clothes.getId();
                UUID memberIdFromToken = jwtService.getMemberIdFromToken(token);

                calendarService.registMyOutfit(memberIdFromToken, imageUrl);

            }
            return baseResponseService.getSuccessResponse();

        }catch(BaseException e){
            return baseResponseService.getFailureResponse(e.status);
        }


    }


}
