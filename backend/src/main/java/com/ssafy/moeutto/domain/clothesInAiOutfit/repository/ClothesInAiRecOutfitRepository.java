package com.ssafy.moeutto.domain.clothesInAiOutfit.repository;

import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfit;
import com.ssafy.moeutto.domain.clothesInAiOutfit.entity.ClothesInAiRecOutfitId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ClothesInAiRecOutfitRepository extends JpaRepository<ClothesInAiRecOutfit, ClothesInAiRecOutfitId> {

    /**
     * AiRecOutfitId에 해당하는 복합키 삭제
     *
     * @param aiRecOutfitId
     */
    void deleteAllByAiRecOutfitId(Integer aiRecOutfitId);

    /**
     * AiRecOutfitId에 해당하는 옷 정보 id 리스트 조회
     *
     * @param aiRecOutfitId
     * @return
     */
    List<ClothesInAiRecOutfit> findAllByAiRecOutfitId(Integer aiRecOutfitId);
}
