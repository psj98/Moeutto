package com.ssafy.moeutto.domain.friendOutfit.repository;

import com.ssafy.moeutto.domain.friendOutfit.entity.FriendOutfit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FriendOutfitRepository extends JpaRepository<FriendOutfit, Integer> {

    /**
     * 사용자 UUID로 추천 정보를 조회합니다.
     *
     * @param memberId - 사용자 UUID
     * @return List<FriendOutfit> - 추천 목록
     */
    List<FriendOutfit> findAllByOwnerIdOrderByRegDateDesc(UUID memberId);
}
