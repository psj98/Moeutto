package com.ssafy.moeutto.domain.member.service;

import java.util.HashMap;

public interface MemberLoginService {

    public String getKakaoPermissionCode();
    public String getKakaoAccessToken(String code);

    public HashMap<String, Object> getUserInfo(String accessToken);

}
