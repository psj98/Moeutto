package com.ssafy.moeutto.domain.aiCheckOutfit.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.AiCheckOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiCheckOutfitRepository extends JpaRepository<AiCheckOutfit, Integer> {

    AiCheckOutfit findAiCheckOutfitById(Integer outfitId);
}
