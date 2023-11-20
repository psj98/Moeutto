package com.ssafy.moeutto.domain.member.service;

import com.google.gson.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class MemberLoginServiceImpl implements MemberLoginService {

    // kakao api key and redirect url
    @Value("${kakao.api.key}")
    private String apiKey;

    @Value("${kakao.secret}")
    private String secret;

    @Value("${kakao.redirect.url}")
    private String redirectURL;

    @Override
    public String getKakaoPermissionCode() {
        String requestURL = "https://kauth.kakao.com/oauth/authorize";
        String code = "";

        try {
            URL url = new URL(requestURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("GET");

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));

            String str = "response_type=code" +
                    "&client_id=" + apiKey +
                    "&redirect_uri=" + redirectURL;

            bw.write(str);
            bw.flush();

            // 요청 통해 얻어온 데이터 읽어옴
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result.toString());

            code = element.getAsJsonObject().get("code").getAsString();

            br.close();
            bw.close();

            return code;
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 인가코드를 사용하여 토큰 발급 ( 일단 accessToken만 반환 )
     *
     * @param
     * @return accessToken
     */
    @Override
    public String KakaoAccessToken(String code) {
        String accessToken = "";
        String refreshToken = "";
        String requestURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(requestURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            // OutputStream으로 POST 데이터 넘기는 옵션
            // POST 요청을 하려면 true 로 설정
            connection.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));

            String str = "grant_type=authorization_code" +
                    "&client_id=" + apiKey +
                    "&redirect_uri=" + redirectURL +
                    "&code=" + code +
                    "&client_secret=" + secret;

            bw.write(str);
            bw.flush();

            int responseCode = connection.getResponseCode();

            // 요청 통해 얻어온 데이터 읽어옴
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }

            JsonParser parser = new JsonParser();
            JsonElement element = parser.parse(result.toString());

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return accessToken;
    }

    /**
     * 발급받은 토큰으로 사용자 정보를 불러와 기존 회원인지 판단, 기존회원 -> 로그인(식별자,JWT반환) , 기존회원 아닐시 -> 회원가입
     *
     * @param accessToken
     * @return
     */
    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) {

        HashMap<String, Object> userInfo = new HashMap<>();
        String postURL = "https://kapi.kakao.com/v2/user/me";

        try {
            URL url = new URL(postURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            connection.setRequestProperty("Authorization", "Bearer " + accessToken);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while ((line = br.readLine()) != null) {
                result.append(line);
            }

            JsonElement element = JsonParser.parseString(result.toString());
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();

            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname", nickname);
            userInfo.put("email", email);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return userInfo;
    }
}
