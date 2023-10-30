package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.clothes.entity.Clothes;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisAmount;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisColor;
import com.ssafy.moeutto.domain.clothes.entity.IClothesAnalysisSeason;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClothesRepository extends JpaRepository<Clothes, Integer> {

    /**
     * 옷 id와 사용자 id로 옷을 조회합니다.
     *
     * @param id
     * @return Optional<Clothes>
     */
    Optional<Clothes> findByIdAndMemberId(Integer id, UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회합니다.
     *
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberId(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByRegDateAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByRegDateDesc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByFrequencyAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByFrequencyDesc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByColorAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdOrderByColorDesc(UUID memberId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWith(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByRegDateAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByRegDateDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByFrequencyAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 빈도 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByFrequencyDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByColorAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByColorDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryId(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByRegDateAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByRegDateDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByFrequencyAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 빈도 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByFrequencyDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByColorAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<Clothes>
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByColorDesc(UUID memberId, String middleCategoryId);

    /**
     * 내 옷장을 색상별로 분석합니다.
     *
     * @param memberId
     * @return List<IClothesAnalysisColor>
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "GROUP BY c.color", nativeQuery = true)
    List<IClothesAnalysisColor> findByColorMember(UUID memberId);

    /**
     * 모든 사용자 옷장을 색상별로 분석합니다.
     *
     * @return List<IClothesAnalysisColor>
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount FROM clothes c " +
            "GROUP BY c.color", nativeQuery = true)
    List<IClothesAnalysisColor> findByColor();

    /**
     * 내 옷장을 계절별로 분석합니다.
     *
     * @param seasonNum
     * @param memberId
     * @return List<IClothesAnalysisSeason>
     */
    @Query(value = "SELECT l.id AS largeCategoryId, ifnull(season.amount, 0) AS amount " +
            "FROM ( " +
            "        SELECT SUBSTRING(m.id, 1, 3) AS id, COUNT(*) AS amount " +
            "        FROM clothes AS c INNER JOIN middle_category AS m ON c.middle_category_id = m.id " +
            "        WHERE SUBSTRING(c.season, ?1, 1) = '1' " +
            "        AND c.member_id = ?2" +
            "        GROUP BY SUBSTRING(m.id, 1, 3)) AS season " +
            "RIGHT JOIN large_category l ON season.id = l.id", nativeQuery = true)
    List<IClothesAnalysisSeason> findBySeasonMember(String seasonNum, UUID memberId);

    /**
     * 사용자가 소유한 옷 개수를 셉니다.
     *
     * @param memberId
     * @return Long
     */
    Long countByMemberId(UUID memberId);

    /**
     * 모든 사용자의 옷 개수를 셉니다.
     *
     * @return Long
     */
    Long countBy();

    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param memberId
     * @return List<IClothesAnalysisAmount>
     */
    @Query(value = "SELECT l.id AS largeCategoryId, IFNULL(minmax.amount, 0) AS amount " +
            "from (SELECT SUBSTRING(c.middle_category_id, 1, 3) AS id, COUNT(*) AS amount " +
            "FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "GROUP BY SUBSTRING(c.middle_category_id, 1, 3) " +
            "ORDER BY SUBSTRING(c.middle_category_id, 1, 3)) AS minmax RIGHT JOIN large_category l " +
            "ON minmax.id = l.id", nativeQuery = true)
    List<IClothesAnalysisAmount> findByMinMaxMember(UUID memberId);
}
