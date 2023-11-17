package com.ssafy.moeutto.domain.friends.repository;

import com.ssafy.moeutto.domain.friends.entity.Following;
import com.ssafy.moeutto.domain.friends.entity.FollowingId;
import com.ssafy.moeutto.global.response.BaseException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface FollowingRepository extends JpaRepository<Following, FollowingId> {

    /**
     * 사용자 UUID로 팔로잉하는 친구를 삭제합니다.
     *
     * @param memberId - 사용자 UUID
     * @throws BaseException - BaseResponse Error 처리
     */
    void deleteAllByFollowingId_MyId(UUID memberId) throws BaseException;
}
