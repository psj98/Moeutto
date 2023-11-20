package com.ssafy.moeutto.domain.member.service;

import java.util.HashMap;

public interface MemberLoginService {

    String getKakaoPermissionCode();

    String KakaoAccessToken(String code);

    HashMap<String, Object> getUserInfo(String accessToken);
}
