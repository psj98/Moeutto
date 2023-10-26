package com.ssafy.moeutto.domain.member.service;

import java.util.HashMap;

public interface MemberLoginService {

    public String getKakaoPermissionCode();
    public String KakaoAccessToken(String code);

//    public HashMap<String, Object> getUserInfo(String accessToken);

}
