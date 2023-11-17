package com.ssafy.moeutto.domain.aiCheckOutfit.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.AiCheckOutfit;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AiCheckOutfitRepository extends JpaRepository<AiCheckOutfit, Integer> {

    AiCheckOutfit findAiCheckOutfitById(Integer outfitId);

    /**
     * 사용자 UUID로 착장 검사 목록을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<AiCheckOutfit> - 착장 검사 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<AiCheckOutfit> findByMemberId(UUID memberId) throws BaseException;
}
