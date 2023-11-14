package com.ssafy.moeutto.domain.S3.controller;

import com.ssafy.moeutto.domain.S3.dto.response.S3ResponseDto;
import com.ssafy.moeutto.domain.S3.service.S3Service;
import com.ssafy.moeutto.global.response.BaseException;
import com.ssafy.moeutto.global.response.BaseResponse;
import com.ssafy.moeutto.global.response.BaseResponseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * S3 테스트용
 */

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {
    private final S3Service s3Service;
    private final BaseResponseService baseResponseService;

    /**
     * S3 Upload 테스트용
     *
     * @param token - accessToken.
     * @param file  - 이미지 파일
     * @return s3ResponseDto
     */
    @PostMapping("/upload")
    public BaseResponse<Object> saveAndInferenceImage(@RequestHeader(value = "accessToken", required = false) String token,
                                                      @RequestParam("file") MultipartFile file) {
        S3ResponseDto s3ResponseDto;

        // S3에 이미지 저장
        try {
            s3ResponseDto = s3Service.uploadImage(token, file);

        } catch (BaseException e) {
            return baseResponseService.getFailureResponse(e.status);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return baseResponseService.getSuccessResponse(s3ResponseDto);
    }
}
