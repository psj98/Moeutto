package com.ssafy.moeutto.domain.clothesInFriendOutfit.repository;

import com.ssafy.moeutto.domain.clothesInFriendOutfit.entity.ClothesInFriendOutfit;
import com.ssafy.moeutto.domain.clothesInFriendOutfit.entity.ClothesInFriendOutfitId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface ClothesInFriendOutfitRepository extends JpaRepository<ClothesInFriendOutfit, ClothesInFriendOutfitId> {

    /**
     * 추천 id로 옷 목록을 조회합니다.
     *
     * @param id - 추천 id
     * @return List<ClothesInFriendOutfit> - 옷 목록
     */
    List<ClothesInFriendOutfit> findAllByFriendOutfitId(Integer id);
}
