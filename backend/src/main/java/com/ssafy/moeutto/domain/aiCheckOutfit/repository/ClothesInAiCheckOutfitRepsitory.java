package com.ssafy.moeutto.domain.aiCheckOutfit.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.ClothesInAiCheckOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesInAiCheckOutfitRepsitory extends JpaRepository<ClothesInAiCheckOutfit, Integer> {
}
