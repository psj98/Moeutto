package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.ClothesRegistResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

public interface ClothesService {

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto
     * @return ClothesRegistResponseDto
     * @throws BaseException
     */
    ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto) throws BaseException;
}
