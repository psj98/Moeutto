package com.ssafy.moeutto.domain.member.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
public class Member {

    @Id
    @Column(name = "id", columnDefinition = "BINARY(16)")
    private UUID id;

    @NotNull
    private String email;

    @NotNull
    private String nickname;

    @Column(columnDefinition = "varchar(256) default 'https://moeutto-bucket.s3.ap-northeast-2.amazonaws.com/default_image.jpeg'")
    private String profileImage;

    @Column(columnDefinition = "tinyint(1) default '0'")
    private boolean closetFind;

    @Column(columnDefinition = "tinyint(1) default '0'")
    private boolean accountFind;

    @Builder(toBuilder = true)
    public Member(UUID id, String email, String nickname
                  ,String profileImage, boolean closetFind, boolean accountFind
                  ) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.closetFind = closetFind;
        this.accountFind = accountFind;
    }
}
