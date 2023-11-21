package com.ssafy.moeutto.domain.friends.entity;

import com.ssafy.moeutto.domain.friends.dto.request.ClothesRecommendListRequestDto;
import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;



@Data
@NoArgsConstructor
@ToString
public class FriendsOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Member owner; // 주인

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recommender_id")
    private Member recommender; // 작성자

    private String comment;

    @NotNull
    private Date regDate;

    @Builder(toBuilder = true)
    public FriendsOutfit(Integer id, Member owner, Member recommender, String comment, Date regDate) {
        this.id = id;
        this.owner = owner;
        this.recommender = recommender;
        this.comment = comment;
        this.regDate = regDate;
    }
}
