package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothesRepository extends JpaRepository<Clothes, Integer> {
}
