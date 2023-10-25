package com.ssafy.moeutto.member.service;

import java.util.HashMap;

public interface MemberLoginService {

    public String getKakaoAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

}
