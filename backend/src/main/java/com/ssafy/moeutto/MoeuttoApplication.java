package com.ssafy.moeutto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import javax.annotation.PostConstruct;
import java.util.TimeZone;


@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class MoeuttoApplication {
    @PostConstruct
    public void changeTimeKST() {
        TimeZone.setDefault(TimeZone.getTimeZone("Asia/Seoul"));
    }
    public static void main(String[] args) {
        SpringApplication.run(MoeuttoApplication.class, args);
    }

}
