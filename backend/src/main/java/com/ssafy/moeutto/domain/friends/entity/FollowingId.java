package com.ssafy.moeutto.domain.friends.entity;

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
@Getter
public class FollowingId implements Serializable {

    @Column(name = "my_id", columnDefinition = "BINARY(16)")
    private UUID myId;

    @Column(name = "following_id", columnDefinition = "BINARY(16)")
    private UUID followingId;

    public FollowingId(UUID myId, UUID followingId) {
        this.myId = myId;
        this.followingId = followingId;
    }

    @Override
    public boolean equals(Object obj) {
        if(this == obj) return true;
        if(obj==null || getClass() != obj.getClass()) return false;
        FollowingId followingId1 = (FollowingId) obj;
        return Objects.equals(myId, followingId1.myId) &&
                Objects.equals(followingId, followingId1.followingId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(myId, followingId);
    }
}


