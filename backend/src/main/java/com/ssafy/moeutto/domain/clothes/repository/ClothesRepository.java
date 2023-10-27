package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {

    @Query(value = "SELECT SUM(price) FROM Clothes " + "WHERE member_id = ?1 ", nativeQuery = true)
    Integer findPriceByMemberId(UUID memberId);

    @Query(value = "SELECT AVG(price) FROM Clothes", nativeQuery = true)
    Integer findAvgOfPrice();
}
