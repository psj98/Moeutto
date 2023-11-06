package com.ssafy.moeutto.domain.friends.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.UUID;

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
