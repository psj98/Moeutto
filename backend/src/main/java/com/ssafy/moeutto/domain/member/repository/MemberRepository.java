package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.friends.dto.request.FriendsListRequestDto;
import com.ssafy.moeutto.domain.friends.dto.response.FriendsListResponseDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {

    Member findMemberByEmail(String email);

    /**
     * 사용자 수를 세는 메서드
     * @return
     */
    Long countBy();

    Member findMemberById(UUID memberId);




    @Query(value = "SELECT m.profile_image as profileImageUrl," +
            "m.nickname as nickname," +
            "m.emaiol as email," +
            "EXSISTS (" +
            "SELECT 1 FROM following f1 " +
            "WHERE f1.my_id = ?1 AND f1.following_id = m.id as isFollwing) " +
            "FROM member m " +
            "WHERE m.nickname LIKE CONCAT('%', ninkname = ?2, '%')", nativeQuery = true)
    List<FriendsListResponseDto> findFriendsListByNickname(UUID memberId, String nickname);


}
