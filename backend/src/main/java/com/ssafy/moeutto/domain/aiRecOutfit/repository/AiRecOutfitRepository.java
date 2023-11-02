package com.ssafy.moeutto.domain.aiRecOutfit.repository;

import com.ssafy.moeutto.domain.aiRecOutfit.entity.AiRecOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;
import java.util.Optional;
import java.util.UUID;

public interface AiRecOutfitRepository extends JpaRepository<AiRecOutfit, Integer> {

    /**
     * 추천 날짜로 AI 추천 착장을 조회합니다.
     *
     * @param recDate
     * @return AiRecOutfit
     */
    Optional<AiRecOutfit> findByMemberIdAndRecDate(UUID memberId, Date recDate);
}
