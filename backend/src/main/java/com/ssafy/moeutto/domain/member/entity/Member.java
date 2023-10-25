package com.ssafy.moeutto.domain.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
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

    @Builder(toBuilder = true)
    public Member(UUID id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }


}
