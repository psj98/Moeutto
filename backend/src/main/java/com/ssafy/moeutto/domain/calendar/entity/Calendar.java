package com.ssafy.moeutto.domain.calendar.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Date;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID memberId;

    @ColumnDefault("0")
    private Integer likeOutfit;

    private String imageUrl;

    private Date regDate;

    @Builder(toBuilder = true)
    public Calendar(Integer id, UUID memberId, Integer likeOutfit,
                    String imageUrl, Date regDate) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.memberId = memberId;
        this.likeOutfit = likeOutfit;
        this.regDate = regDate;
    }
}
