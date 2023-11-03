package com.ssafy.moeutto.domain.friends.entity;


import lombok.AllArgsConstructor;
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
@AllArgsConstructor
public class Follower {

//    @Id
//    @NotNull
//    UUID myId;
//    @NotNull
//    UUID followerId;
@EmbeddedId
private FollowerId followerId;

}
