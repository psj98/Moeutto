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
    private UUID id;

    private String email;
    private String nickname;
//    private String image;

//    @Builder
//    public Member(String email, String nickname) {
//        this.email = email;
//        this.nickname = nickname;
//    }

    @Builder
    public Member(UUID id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }

}
