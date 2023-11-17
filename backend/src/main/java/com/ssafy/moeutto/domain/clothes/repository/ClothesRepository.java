package com.ssafy.moeutto.domain.clothes.repository;

import com.ssafy.moeutto.domain.aiCheckOutfit.entity.IAiCheckOutfitPythonResponseClothesResult;
import com.ssafy.moeutto.domain.clothes.entity.*;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ClothesRepository extends JpaRepository<Clothes, Integer> {

    /**
     * 옷 id와 사용자 id로 옷을 조회합니다.
     *
     * @param id       - 옷 정보 id
     * @param memberId - 사용자 UUID
     * @return Optional<Clothes> - 옷 정보
     */
    Optional<Clothes> findByIdAndMemberId(Integer id, UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록
     */
    List<Clothes> findAllByMemberId(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록
     */
    List<Clothes> findAllByMemberIdOrderByRegDateAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdOrderByRegDateDesc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdOrderByFrequencyAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdOrderByFrequencyDesc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdOrderByColorAsc(UUID memberId);

    /**
     * 사용자 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdOrderByColorDesc(UUID memberId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWith(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByRegDateAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByRegDateDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByFrequencyAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 빈도 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByFrequencyDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByColorAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 대분류 카테고리 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdStartingWithOrderByColorDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryId(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 등록일 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByRegDateAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 등록일 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByRegDateDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 빈도 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByFrequencyAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 빈도 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByFrequencyDesc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 색상 오름차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByColorAsc(UUID memberId, String middleCategoryId);

    /**
     * 사용자 id와 중분류 카테고리 id로 옷 목록을 조회하고, 색상 내림차순으로 정렬합니다.
     *
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중분류 카테고리 id
     * @return List<Clothes> - 옷 목록 정보
     */
    List<Clothes> findAllByMemberIdAndMiddleCategoryIdOrderByColorDesc(UUID memberId, String middleCategoryId);

    /**
     * 내 옷장을 색상별로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisColor> - 내 옷 색상 분석 정보
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "GROUP BY c.color " +
            "ORDER BY amount DESC ", nativeQuery = true)
    List<IClothesAnalysisColor> findByColorMember(UUID memberId);

    /**
     * 모든 사용자 옷장을 색상별로 분석합니다.
     *
     * @return List<IClothesAnalysisColor> - 모든 사용자 옷 색상 분석 정보
     */
    @Query(value = "SELECT c.color AS color, COUNT(*) AS amount " +
            "FROM clothes c " +
            "GROUP BY c.color " +
            "ORDER BY amount DESC ", nativeQuery = true)
    List<IClothesAnalysisColor> findByColor();

    /**
     * 내 옷장을 계절별로 분석합니다.
     *
     * @param seasonNum
     * @param memberId  - 사용자 UUID
     * @return List<IClothesAnalysisSeason> - 옷 계절 분석 정본
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
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisFrequency> - 옷 빈도 분석 정보 (가장 많인 입은)
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
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisFrequency> - 옷 빈도 분석 정보 (가장 적게 입은)
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
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisCost> - 옷 가격 분석 정보
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
     * @param memberId - 사용자 UUID
     * @return Integer - 내 옷장 평균 가격
     */
    @Query(value = "SELECT IFNULL(ROUND(SUM(c.price)), 0) FROM clothes c " + "WHERE c.member_id = ?1 ", nativeQuery = true)
    Integer findPriceByMemberId(UUID memberId);

    /**
     * 모든 사용자 옷장 평균 가격
     *
     * @return Integer - 모든 사용자 옷장 평균 가격
     */
    @Query(value = "SELECT SUM(c.price) / (SELECT COUNT(*) FROM member m) FROM clothes c ", nativeQuery = true)
    Integer findAvgOfPrice();

    /**
     * 사용자가 소유한 옷 개수를 셉니다.
     *
     * @param memberId - 사용자 UUID
     * @return Long - 내가 소유한 옷 개수
     */
    Long countByMemberId(UUID memberId);

    /**
     * 모든 사용자의 옷 개수를 셉니다.
     *
     * @return Long - 모든 사용자 옷 개수
     */
    Long countBy();

    /**
     * 옷장을 미니멀 / 맥시멀 기준으로 분석합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisAmount> - 옷 미니멀 / 맥시멀 분석 정보
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
     * @param memberId - 사용자 UUID
     * @return Long - n개월 이내에 입은 옷 개수
     */
    @Query(value = "SELECT COUNT(*) FROM clothes c " +
            "WHERE c.recent_date >= NOW() - INTERVAL 3 MONTH AND c.recent_date <= NOW() " +
            "AND c.frequency > 0 " +
            "AND c.member_id = ?1", nativeQuery = true)
    Long findRecentDateForNMonthByMemberId(UUID memberId);

    /**
     * 최근 n개월 내 입은 옷을 분석합니다. - 대분류 카테고리 별 활용도
     *
     * @param memberId - 사용자 UUID
     * @return List<IClothesAnalysisAvailability> - 옷 활용도 분석 정보
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
     * 옷 정보 id를 Clothes 형태로 리턴
     *
     * @param clothesId - 옷 정보 id
     * @return Clothes - 옷 정보
     */
    @Query(value = "SELECT * FROM clothes c WHERE c.id = ?1 ", nativeQuery = true)
    Clothes findByClothesId(int clothesId);

    /**
     * Python 서버에 착장 검사 요청 후 받은 Response에 옷의 largeCategoryId와 imageUrl을 추가해주기 위해
     *
     * @param clothesId - 옷 정보 id
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
     * @param memberId         - 사용자 UUID
     * @param middleCategoryId - 중뷴류 카테고리 id
     * @return List<IClothesAIRecOutfitCombine> - 대분류 카테고리 별 옷 목록
     */
    @Query(value = "SELECT c.id AS clothesId, c.season, c.color, c.thickness, c.textile, c.frequency, c.recent_date AS recentDate FROM clothes c " +
            "WHERE c.member_id = ?1 " +
            "AND SUBSTRING(c.middle_category_id, 1, 3) = ?2 ", nativeQuery = true)
    List<IClothesAIRecOutfitCombine> findAllByMemberIdAndMiddleCategory(UUID memberId, String middleCategoryId);

    /**
     * 사용자 UUID로 옷 정보를 삭제합니다.
     *
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByMemberId(UUID memberId) throws BaseException;
}
