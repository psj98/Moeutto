package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.clothes.dto.response.ClothesAnalysisCostResponseDto;
import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisColor;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisSeason;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import java.util.UUID;

@Repository
public interface ClothesRepository extends JpaRepository<Clothes, Integer> {

    /**
     * 내 옷장 카테고리 별 가격
     * @return
     */
    @Query(value = "SELECT SUBSTRING(c.middle_category_id, 1, 3) as largeCategoryId, SUM(c.price) as price, COUNT(*) as amount " +
            "FROM clothes c " +
            "WHERE member_id = ?1 "+
            "GROUP BY substring(c.middle_category_id, 1, 3) " +
            "ORDER BY substring(c.middle_category_id, 1, 3)", nativeQuery = true)
    List<ClothesAnalysisCostResponseDto.AnalysisCostItem> findCostOfMyClothesByCategory(UUID memberId);

    /**
     * 내 옷장 총 가격
     * @param memberId
     * @return
     */
    @Query(value = "SELECT ROUND(SUM(price)) FROM Clothes " + "WHERE member_id = ?1 ", nativeQuery = true)
    Integer findPriceByMemberId(UUID memberId);

    /**
     * 모든 사용자 옷장 평균 가격.
     * @return
     */
    @Query(value = "SELECT AVG(price) FROM Clothes", nativeQuery = true)
    Integer findAvgOfPrice();
    /**
     * 옷 id와 사용자 id로 옷을 조회합니다.
     *
     * @param id
     * @return
     */
    Optional<Clothes> findByIdAndMemberId(Integer id, UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회합니다.
     *
     * @return
     */
    List<Clothes> findAllByMemberId(UUID memberId);

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

    /**
     * 내 옷장을 계절별로 분석합니다.
     *
     * @param seasonNum
     * @param memberId
     * @return
     */
    @Query(value = "SELECT l.id AS largeCategoryId, ifnull(season.amount, 0) AS amount " +
            "FROM ( " +
            "        SELECT SUBSTRING(m.id, 1, 3) AS id, COUNT(*) AS amount " +
            "        FROM clothes AS c INNER JOIN middle_category AS m ON c.middle_category_id = m.id " +
            "        WHERE SUBSTRING(c.season, ?1, 1) = '1' " +
            "        AND c.member_id = ?2" +
            "        GROUP BY SUBSTRING(m.id, 1, 3)) AS season " +
            "RIGHT JOIN large_category l ON season.id = l.id;", nativeQuery = true)
    List<IClothesAnalysisSeason> findBySeasonMember(String seasonNum, UUID memberId);
}
