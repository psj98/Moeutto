package com.ssafy.moeutto.domain.guestBook.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
public class GuestBook {

    @Id
    private Integer id;

    @Builder(toBuilder = true)
    public GuestBook(Integer id) {
        this.id = id;
    }
}
