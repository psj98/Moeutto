package com.ssafy.moeutto.domain.member.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    // 쭈니한테 UUID 자동생성 stratagy 물어보기, 테스트용으로 Long으로 함
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String nickname;
//    private String image;

    @Builder
    public Member(String email, String nickname) {
        this.email = email;
        this.nickname = nickname;
    }


}
