package com.ssafy.moeutto.domain.aiCheckOutfit.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class AiCheckOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 착장 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    private DateTime regDate;

    @Builder(toBuilder = true)
    public AiCheckOutfit(Integer id, Member member, DateTime regDate) {
        this.id = id;
        this.member = member;
        this.regDate = regDate;
    }
}
