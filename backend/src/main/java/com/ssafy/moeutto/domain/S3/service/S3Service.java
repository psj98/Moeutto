package com.ssafy.moeutto.domain.S3.service;

import com.ssafy.moeutto.domain.S3.dto.response.S3ResponseDto;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface S3Service {

    S3ResponseDto uploadImage(String token, MultipartFile file) throws BaseException, IOException;

    void createFolder(String folderName) throws BaseException;
}
