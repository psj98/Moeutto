package com.ssafy.moeutto.domain.clothes.service;

import com.ssafy.moeutto.domain.clothes.dto.request.ClothesRegistRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.request.ClothesUpdateRequestDto;
import com.ssafy.moeutto.domain.clothes.dto.response.*;
import com.ssafy.moeutto.global.response.BaseException;

import java.util.List;

public interface ClothesService {

    /**
     * 옷 정보를 등록합니다.
     *
     * @param clothesRegistRequestDto
     * @return ClothesRegistResponseDto
     * @throws BaseException
     */
    ClothesRegistResponseDto registClothes(ClothesRegistRequestDto clothesRegistRequestDto) throws BaseException;

    /**
     * 옷 정보를 조회합니다.
     *
     * @param id
     * @return ClothesDetailResponseDto
     * @throws BaseException
     */
    ClothesDetailResponseDto detailClothes(Integer id) throws BaseException;

    /**
     * 옷 목록을 조회합니다.
     * 
     * @return List<ClothesListResponseDto>
     * @throws BaseException
     */
    List<ClothesListResponseDto> listClothes() throws BaseException;

    /**
     * 옷 정보를 수정합니다.
     *
     * @param clothesUpdateRequestDto
     * @return ClothesUpdateResponseDto
     * @throws BaseException
     */
    ClothesUpdateResponseDto updateClothes(ClothesUpdateRequestDto clothesUpdateRequestDto) throws BaseException;

    /**
     * 옷 정보를 해제합니다.
     *
     * @param id
     * @throws BaseException
     */
    void deleteClothes(Integer id) throws BaseException;

    /**
     * 옷 즐겨찾기를 등록 / 삭제합니다.
     *
     * @param id
     * @return
     * @throws BaseException
     */
    ClothesStarResponseDto starClothes(Integer id) throws BaseException;



}
