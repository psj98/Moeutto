package com.ssafy.moeutto.domain.aiCheckOutfit.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.ClothesInAiCheckOutfit;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesInAiCheckOutfitRepository extends JpaRepository<ClothesInAiCheckOutfit, Integer> {

    /**
     * 착장 검사 id로 착장 검사 옷을 삭제합니다.
     *
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByAiCheckOutfitId(Integer aiCheckOutfitId) throws BaseException;
}
