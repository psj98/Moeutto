package com.ssafy.moeutto.domain.aiRecOutfit.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor
public class AiRecOutfit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member; // 사용자 정보

    private Date recDate; // 등록 날짜

    @Builder(toBuilder = true)
    public AiRecOutfit(Integer id, Member member, Date recDate) {
        this.id = id;
        this.member = member;
        this.recDate = recDate;
    }
}
