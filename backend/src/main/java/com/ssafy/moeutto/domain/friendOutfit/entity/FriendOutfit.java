package com.ssafy.moeutto.domain.friendOutfit.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
@ToString
public class FriendOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Member owner; // 주인

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommender_id")
    private Member recommender; // 작성자

    private String comment; // 코멘트

    private Timestamp regDate; // 추천 날짜

    @Builder(toBuilder = true)
    public FriendOutfit(Integer id, Member owner, Member recommender, String comment, Timestamp regDate) {
        this.id = id;
        this.owner = owner;
        this.recommender = recommender;
        this.comment = comment;
        this.regDate = regDate;
    }
}
