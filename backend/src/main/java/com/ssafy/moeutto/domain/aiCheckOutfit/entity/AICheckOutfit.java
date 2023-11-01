package com.ssafy.moeutto.domain.aiCheckOutfit.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GeneratorType;
import org.joda.time.DateTime;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@DynamicInsert
public class AICheckOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 착장 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    private DateTime regDate;

    @Builder(toBuilder = true)
    public AICheckOutfit(Integer id, Member memeber, DateTime regDate) {
        this.id = id;
        this.member = memeber;
        this.regDate = regDate;
    }
}
