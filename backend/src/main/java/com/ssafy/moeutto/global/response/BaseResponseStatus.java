package com.ssafy.moeutto.global.response;

import lombok.Getter;

@Getter
public enum BaseResponseStatus {

    // -------- 성공 코드 시작 -------- //
    SUCCESS(true, 1000, "요청에 성공했습니다."),
    // -------- 성공 코드 종료 -------- //

    // -------- 실패 코드 시작 -------- //
    // -------- 필요한 에러 코드 추가 => Code 만들 때 안겹치게 몇번대 사용할 건지 얘기할 것  -------- //
    /**
     * Member
     * Code : 2000번대
     */
    NOT_FOUND_MEMBER(false, 2001, "일치하는 사용자가 없습니다."),
    SESSION_EXPIRATION(false, 2002, "세션이 만료되었습니다"),
    CANT_GET_MEMBER_INFO(false, 2003, "마이페이지에서 유저 정보를 가져오지 못했습니다."),
    MYPAGE_UPDATE_FAILED(false, 2004, "내 정보 업데이트가 실패했습니다."),
    NICKNAME_OVER_LENGTH_EIGHT(false, 2005, "닉네임 길이가 8을 넘었습니다."),

    /**
     * Clothes
     * Code : 3000번대
     */
    NOT_FOUND_CLOTHES(false, 3001, "옷 정보가 존재하지 않습니다."),
    NOT_FOUND_CLOTHES_LIST(false, 3002, "옷 목록이 존재하지 않습니다."),
    NOT_FOUND_CATEGORY_ANALYSIS_INFO(false, 3003, "카테고리별 옷 정보가 존재하지 않습니다."),
    NOT_FOUND_COLOR_ANALYSIS_INFO(false, 3004, "색상 별 옷 정보가 존재하지 않습니다."),
    TOO_LITTLE_CLOTHES_FROM_LARGE_CATEGORY(false, 3010, "옷이 너무 적습니다."),
    UNDISCLOSED_CLOSET(false, 3020, "공개되지 않은 옷장입니다."),

    /**
     * Calendar
     * Code : 4000번대
     */

    NOT_FOUND_CALENDAR_INFO(false, 4001, "캘린더가 존재하지 않습니다."),
    NOT_FOUND_CALENDAR_FOR_DATE(false, 4002, "해당 날짜에 캘린더가 존재하지 않습니다."),
    DUPLICATED_CALENDAR_INFO(false, 4003, "해당 날짜에 이미 캘린더가 존재합니다."),
    CALENDAR_REGIST_SUCCESS(true, 4004, "캘린더 등록에 성공했습니다."),


    /**
     * Category
     * Code : 5000번대
     */
    NOT_FOUND_LARGE_CATEGORY(false, 5001, "대분류 카테고리가 존재하지 않습니다."),
    NOT_FOUND_MIDDLE_CATEGORY(false, 5002, "중분류 카테고리가 존재하지 않습니다."),
    NOT_FOUND_MIDDLE_CATEGORY_BY_LARGE_CATEGORY(false, 5003, "대분류 카테고리에 해당하는 중분류 카테고리 목록이 존재하지 않습니다."),

    /**
     * AICheckOutfit
     * Code : 6000번대
     */
    JSON_PARSE_ERROR(false, 6001, "데이터 파싱에 실패하였습니다."),
    OVER_FOUR_ITEMS_ERROR(false, 6002, "옷이 네 벌 초과로 입력되었습니다"),
    DUPLICATED_LARGE_CATEGORY(false, 6003, "같은 대분류가 여러개가 입력되었습니다"),
    NO_TOP_OR_BOTTOM_CLOTHES(false, 6004, "상의나 하의가 없습니다"),

    /**
     * S3 Image Upload
     * Code : 7000번대
     */
    S3_FILE_IO_ERROR(false, 7001, "S3 업로드 중 에러가 발생."),
    S3_FOLDER_MAKE_ERROR(false, 7002, "S3 사용자 폴더 생성 에러"),

    /**
     * AiRecOutfit
     * Code : 8000번대
     */
    TOO_LITTLE_CLOTHES(false, 8001, "보유한 옷이 적어 추천이 불가능합니다."),
    RECOMMENDATION_ERROR(false, 8002, "추천하는 과정에서 오류가 발생하였습니다."),
    NO_AI_RECOMMENDED_OUTFIT_FOR_CUR_DATE(false, 8003, "현재 날짜에 추천된 착장이 없습니다.");

    // -------- 실패 코드 종료 -------- //

    private boolean isSuccess; // 성공 여부
    private String message; // 메시지
    private int code; // 코드

    /**
     * BaseResponseStatus 에서 해당하는 코드를 매핑
     *
     * @param isSuccess
     * @param code
     * @param message
     */
    BaseResponseStatus(boolean isSuccess, int code, String message) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
    }
}
