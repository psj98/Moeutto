package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisColor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ClothesRepository extends JpaRepository<Clothes, Integer> {

    /**
     * 내 옷장을 색상별로 분석합니다.
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount FROM clothes c " +
                   "WHERE c.member_id = ?1 " +
                   "GROUP BY c.color", nativeQuery = true)
    List<IClothesAnalysisColor> findByColorMember(UUID memberId);

    /**
     * 모든 사용자 옷장을 색상별로 분석합니다.
     *
     * @return
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount FROM clothes c " +
                   "GROUP BY c.color", nativeQuery = true)
    List<IClothesAnalysisColor> findByColor();
}
