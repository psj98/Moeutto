package com.ssafy.moeutto.domain.friends.repository;

import com.ssafy.moeutto.domain.friends.entity.Follower;
import com.ssafy.moeutto.domain.friends.entity.FollowerId;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FollowerRepository extends JpaRepository<Follower, FollowerId> {

    /**
     * 사용자 UUID로 팔로우하는 친구를 삭제합니다.
     * 
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByFollowerId_MyId(UUID memberId) throws BaseException;
}
