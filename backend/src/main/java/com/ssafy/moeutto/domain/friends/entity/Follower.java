package com.ssafy.moeutto.domain.friends.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor
public class Follower {

    @EmbeddedId
    @NotNull
    private FollowerId followerId;

    @Builder(toBuilder = true)
    public Follower(FollowerId followerId) {
        this.followerId = followerId;
    }
}
