package com.ssafy.moeutto.domain.guestBook.entity;

import com.ssafy.moeutto.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Getter
@NoArgsConstructor
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // 방명록 id

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Member owner; // 주인

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "writer_id")
    private Member writer; // 작성자

    @NotNull
    private String post; // 방명록 글

    private Date regDate; // 등록 날짜

    @Builder(toBuilder = true)
    public GuestBook(Integer id, Member owner, Member writer, String post, Date regDate) {
        this.id = id;
        this.owner = owner;
        this.writer = writer;
        this.post = post;
        this.regDate = regDate;
    }
}
