package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.ClothesRegistResponseDto;
import com.ssafy.moeutto.global.response.BaseException;

public interface ClothesService {

    ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto) throws BaseException;
}
