package com.ssafy.moeutto.domain.friends.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class Following {

    @Builder(toBuilder = true)
    public Following(FollowingId followingId) {
        this.followingId = followingId;
    }

    @EmbeddedId
    private FollowingId followingId;
}
