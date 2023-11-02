package com.ssafy.moeutto.domain.clothesInAiOutfit.repository;

import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfit;
import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfitId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesInAiRecOutfitRepository extends JpaRepository<ClothesInAiRecOutfit, ClothesInAiRecOutfitId> {

    /**
     * AiRecOutfitId에 해당하는 복합키 삭제
     *
     * @param aiRecOutfitId
     */
    void deleteAllByAiRecOutfitId(Integer aiRecOutfitId);
}
