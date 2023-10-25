package com.ssafy.moeutto.domain.calendar.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private UUID memberId;
    private Integer likeOutfit;
    private String imageUrl;
    private Timestamp regDate;


    @Builder(toBuilder = true)
    public Calendar(Integer id, UUID memberId, Integer likeOutfit,
                    String imageUrl, Timestamp regDate) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.memberId = memberId;
        this.likeOutfit = likeOutfit;
        this.regDate = regDate;

    }
}
