package com.ssafy.moeutto.domain.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @NotNull
    private String email;

    @NotNull
    private String nickname;

//    @NotNull
//    private String image;

    @Builder(toBuilder = true)
    public Member(UUID id, String email, String nickname) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }
}
