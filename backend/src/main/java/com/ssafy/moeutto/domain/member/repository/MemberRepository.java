package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

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



    List<Member> findFriendsListByNickname(String nickname);


}
