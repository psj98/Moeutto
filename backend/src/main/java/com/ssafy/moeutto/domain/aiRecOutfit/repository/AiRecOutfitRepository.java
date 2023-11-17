package com.ssafy.moeutto.domain.aiRecOutfit.repository;

import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AiRecOutfitRepository extends JpaRepository<AiRecOutfit, Integer> {

    /**
     * 추천 날짜로 AI 추천 착장을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @param recDate  - 현재 날짜
     * @return Optional<AiRecOutfit> - AI 추천 착장 정보
     * @throws BaseException - BaseResponse Error 처리
     */
    Optional<AiRecOutfit> findByMemberIdAndRecDate(UUID memberId, Date recDate) throws BaseException;

    /**
     * @param memberId - 사용자 UUID
     * @return List<AiRecOutfit> - AI 추천 착장 정보 목록
     * @throws BaseException - BaseResponse Error 처리
     */
    List<AiRecOutfit> findByMemberId(UUID memberId) throws BaseException;
}
