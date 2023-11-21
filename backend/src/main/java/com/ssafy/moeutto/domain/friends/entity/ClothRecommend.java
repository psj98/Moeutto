package com.ssafy.moeutto.domain.friends.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ClothRecommend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(columnDefinition = "BINARY(16)")
    @NotNull
    private UUID clothId;

    @ColumnDefault("")
    private String comment;

    @NotNull
    private Date writhDate;

    @Builder(toBuilder = true)
    public ClothRecommend(Integer id, UUID clothId, String comment, Date writhDate) {
        this.id = id;
        this.clothId = clothId;
        this.comment = comment;
        this.writhDate = writhDate;
    }
}
