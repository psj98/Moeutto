package com.ssafy.moeutto.domain.clothesInAiRecOutfit.repository;

import com.ssafy.moeutto.domain.clothesInAiRecOutfit.entity.ClothesInAiRecOutfit;
import com.ssafy.moeutto.domain.clothesInAiRecOutfit.entity.ClothesInAiRecOutfitId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ClothesInAiRecOutfitRepository extends JpaRepository<ClothesInAiRecOutfit, ClothesInAiRecOutfitId> {

    /**
     * AiRecOutfitId에 해당하는 복합키 삭제
     *
     * @param aiRecOutfitId - AI가 추천한 착장 id
     */
    void deleteAllByAiRecOutfitId(Integer aiRecOutfitId);

    /**
     * AiRecOutfitId에 해당하는 옷 정보 id 리스트 조회
     *
     * @param aiRecOutfitId - Ai가 추천한 착장 id
     * @return List<ClothesInAiRecOutfit> - AI가 추천한 착장 id에 해당하는 옷 정보 목록
     */
    List<ClothesInAiRecOutfit> findAllByAiRecOutfitId(Integer aiRecOutfitId);
}
