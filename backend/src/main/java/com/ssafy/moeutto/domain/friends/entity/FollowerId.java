package com.ssafy.moeutto.domain.friends.entity;


import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
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
@Getter
public class FollowerId implements Serializable {

    @Column(name = "my_id", columnDefinition = "BINARY(16)")
    private UUID myId;


    @Column(name = "follower_id", columnDefinition = "BINARY(16)")
    private UUID followerId;

    @Builder(toBuilder = true)
    public FollowerId(UUID myId, UUID followerId) {
        this.myId = myId;
        this.followerId = followerId;
    }

}
