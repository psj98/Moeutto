package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
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
     *
     * @return
     */
    Long countBy();
}
