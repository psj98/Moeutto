package com.ssafy.moeutto.domain.friends.entity;


import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

/**
 * 복합키 식별자 클래스
 */
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class FollowerId implements Serializable {

    @Column(name = "my_id", columnDefinition = "BINARY(16)")
    private UUID myId;


    @Column(name = "following_id", columnDefinition = "BINARY(16)")
    private UUID followingId;

    public FollowerId(UUID myId, UUID followingId) {
        this.myId = myId;
        this.followingId = followingId;
    }

}
