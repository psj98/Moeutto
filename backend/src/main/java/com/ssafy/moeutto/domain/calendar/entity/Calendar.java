package com.ssafy.moeutto.domain.calendar.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class Calendar {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public Calendar(Integer id) {
        this.id = id;
    }
}
