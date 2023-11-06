package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.FriendsListResponseDto;
import com.ssafy.moeutto.domain.friends.dto.response.MyFriendsListResponseDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    /**
     * 이메일로 사용자 정보를 찾습니다.
     *
     * @param email
     * @return Optional<Member>
     */
    Optional<Member> findByEmail(String email);

    /**
     * 사용자 수를 세는 메서드
     * @return
     */
    Long countBy();

    Member findMemberById(UUID memberId);


    /**
     * 닉네임과 내 아이디를 기반으로 친구 목록의 멤버 정보 검색.
     * 팔로우 여부 위해 my_id(memberId)필요
     * @param memberId
     * @param nickname
     * @return
     */

    @Query(value = "SELECT m.profile_image as profileImageUrl, " +
            "m.nickname as nickname, " +
            "m.email as email, " +
            "EXISTS (" +
            "SELECT 1 FROM following f1 " +
            "WHERE f1.my_id = ?1 AND f1.following_id = m.id) as isFollowing " +
            "FROM member m " +
            "WHERE m.nickname LIKE CONCAT('%', ?2, '%')", nativeQuery = true)
    List<FriendsListResponseDto> findFriendsListByNickname(UUID memberId, String nickname);


    /**
     * 내가 팔로우 하는 친구들의 멤버 정보 검색
     * @param memberId
     * @return
     */
    @Query(value = "SELECT m.email, m.nickname, m.profile_iamge " +
            "FROM member m " +
            "WHERE id = (" +
            "SELECT following_id " +
            "FROM following " +
            "where my_id = ?1)", nativeQuery = true)
    List<MyFriendsListResponseDto> findMyFollowingListById(UUID memberId);
}
