package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.IAiCheckOutfitPythonResponseClothesResult;
import com.ssafy.moeutto.domain.clothes.entity.*;
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
     * 내 옷장을 빈도별로 분석합니다. (가장 많이 입은 옷 3개)
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT middle_category_id AS middleCategoryId, season, color, thickness, price, textile, frequency, image_url AS imageUrl " +
            "FROM clothes " +
            "WHERE member_id = ?1 " +
            "ORDER BY frequency " +
            "DESC LIMIT 3 ", nativeQuery = true)
    List<IClothesAnalysisFrequency> findByFrequencyMax(UUID memberId);

    /**
     * 내 옷장을 빈도별로 분석합니다. (가장 적게 입은 옷 3개)
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT middle_category_id AS middleCategoryId, season, color, thickness, price, textile, frequency, image_url AS imageUrl " +
            "FROM clothes " +
            "WHERE member_id = ?1 " +
            "ORDER BY frequency " +
            "ASC LIMIT 3 ", nativeQuery = true)
    List<IClothesAnalysisFrequency> findByFrequencyMin(UUID memberId);

    /**
     * 내 옷장 카테고리 별 가격
     *
     * @return
     */
    @Query(value = "SELECT SUBSTRING(c.middle_category_id, 1, 3) as largeCategoryId, SUM(c.price) as price, COUNT(*) as amount " +
            "FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "GROUP BY SUBSTRING(c.middle_category_id, 1, 3) " +
            "ORDER BY SUBSTRING(c.middle_category_id, 1, 3)", nativeQuery = true)
    List<IClothesAnalysisCost> findCostOfMyClothesByCategory(UUID memberId);

    /**
     * 내 옷장 총 가격
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT ROUND(SUM(price)) FROM Clothes " + "WHERE member_id = ?1 ", nativeQuery = true)
    Integer findPriceByMemberId(UUID memberId);

    /**
     * 모든 사용자 옷장 평균 가격
     *
     * @return
     */
    @Query(value = "SELECT AVG(price) FROM Clothes", nativeQuery = true)
    Integer findAvgOfPrice();

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

    /**
     * 최근 n개월 내 입은 옷을 분석합니다. - 전체 활용도
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT COUNT(*) FROM Clothes " +
            "WHERE recent_date >= NOW() - INTERVAL 3 MONTH AND recent_date <= NOW() " +
            "AND frequency > 0 " +
            "AND member_id = ?1", nativeQuery = true)
    Long findRecentDateForNMonthByMemberId(UUID memberId);

    /**
     * 최근 n개월 내 입은 옷을 분석합니다. - 대분류 카테고리 별 활용도
     *
     * @param memberId
     * @return
     */
    @Query(value = "SELECT SUBSTRING(c.middle_category_id, 1, 3) as largeCategoryId, COUNT(*) as totalAmount, " +
            "SUM(CASE " +
            "       WHEN c.recent_date >= NOW() - INTERVAL 3 MONTH AND c.recent_date <= NOW() AND c.frequency > 0 " +
            "       THEN 1 " +
            "       ELSE 0 " +
            "   END) AS usedAmount " +
            "FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "GROUP BY SUBSTRING(c.middle_category_id, 1, 3) " +
            "ORDER BY SUBSTRING(c.middle_category_id, 1, 3) ", nativeQuery = true)
    List<IClothesAnalysisAvailability> findMyAnalysisAmountByMemberId(UUID memberId);

    /**
     * 옷 번호로 옷을 찾아 Clothes 형태로 리턴
     *
     * @param clothesId
     * @return Clothes
     */
    @Query(value = "SELECT * FROM clothes WHERE id = ?1", nativeQuery = true)
    Clothes findByClothesId(int clothesId);

    /**
     * Python 서버에 착장 검사 요청 후 받은 Response에 옷의 largeCategoryId와 imageUrl을 추가해주기 위해
     *
     * @param clothesId
     * @return AICheckOutfitPythonResponseClothesResult
     */
    @Query(value = "SELECT a.id AS id , a.image_url AS imageUrl , b.large_category_id AS largeCategoryId " +
            "FROM clothes AS a LEFT JOIN middle_category AS b " +
            "ON a.middle_category_id = b.id " +
            "WHERE a.id = :clothesId " +
            "UNION " +
            "SELECT a.id AS id , a.image_url AS imageUrl , b.large_category_id AS largeCategoryId " +
            "FROM clothes AS a RIGHT JOIN middle_category AS b " +
            "ON a.middle_category_id = b.id " +
            "WHERE a.id = :clothesId ", nativeQuery = true)
    IAiCheckOutfitPythonResponseClothesResult findIdAndImageUrlAndLargeCategoryIdByClothesId(int clothesId);

    /**
     * 대분류 카테고리 별 옷 목록을 조회합니다.
     *
     * @param memberId
     * @param middleCategoryId
     * @return List<IClothesAIRecOutfitCombine>
     */
    @Query(value = "SELECT * FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "AND SUBSTRING(c.middle_category_id, 1, 3) = ?2 ", nativeQuery = true)
    List<IClothesAIRecOutfitCombine> findAllByMemberIdAndMiddleCategory(UUID memberId, String middleCategoryId);
}
