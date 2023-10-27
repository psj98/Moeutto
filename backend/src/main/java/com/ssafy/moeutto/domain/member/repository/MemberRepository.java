package com.ssafy.moeutto.domain.member.repository;

import com.ssafy.moeutto.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberByEmail(String email);
}
