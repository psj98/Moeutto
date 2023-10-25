package com.ssafy.moeutto.member.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
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
    public static String apiKey;
    public static String redirectURL;


    @Value("${kakao.api.key}")
    public void setKey(String val){
        apiKey = val;
    }

    @Value("${kakao.redirect.url}")
    public void setURL(String val){
        redirectURL = val;
    }

    /**
     * 인가코드를 사용하여 토큰 발급 ( 일단 accessToken만 반환 )
     * @param code
     * @return accessToken
     */
    @Override
    public String getKakaoAccessToken(String code) {

        String accessToken = "";
        String refreshToken = "";
        String requestURL = "https://kauth.kakao.com/oauth/token";

        try{
            URL url = new URL(requestURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            connection.setRequestMethod("POST");
            // OutputStream으로 POST 데이터 넘기는 옵션
            // POST 요청을 하려면 true 로 설정
            connection.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream()));

            String str = "grant_type=authorization_code"+
                    "&client_id="+apiKey+
                    "&redirect_uri="+redirectURL+
                    "&code=" + code;

            bw.write(str);
            bw.flush();

            // 302 코드가 와야 로그인이 작동된다
            int responseCode = connection.getResponseCode();
            // 확인용
            System.out.println("responseCode : "+responseCode);

            // 요청 통해 얻어온 데이터 읽어옴
            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while((line = br.readLine()) != null){
                result.append(line);
            }

            // 확인용
            System.out.println("response body : "+result);

            JsonElement element = JsonParser.parseString(result.toString());

            accessToken = element.getAsJsonObject().get("access_token").getAsString();
            refreshToken = element.getAsJsonObject().get("refresh_token").getAsString();

            // 확인용
            System.out.println("accessToken : "+ accessToken);
            System.out.println("refreshToken : "+ refreshToken);

            br.close();
            bw.close();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return accessToken;
    }


    /**
     * 발급받은 토큰으로 사용자 정보를 불러와 기존 회원인지 판단, 기존회원 -> 로그인(식별자,JWT반환) , 기존회원 아닐시 -> 회원가입
     * @param accessToken
     * @return
     */
    @Override
    public HashMap<String, Object> getUserInfo(String accessToken) {

        HashMap<String, Object> userInfo = new HashMap<>();
        String postURL = "https://kapi.kakao.com/v2/user/me";

        try{
            URL url = new URL(postURL);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");

            connection.setRequestProperty("Authorization","Bearer "+accessToken);

            int responseCode = connection.getResponseCode();

            // 상태 코드 확인용
            System.out.println("responseCode : "+responseCode);

            BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line = "";
            StringBuilder result = new StringBuilder();

            while((line = br.readLine()) != null){
                result.append(line);
            }

            JsonElement element = JsonParser.parseString(result.toString());
            JsonObject properties = element.getAsJsonObject().get("properties").getAsJsonObject();
            JsonObject kakaoAccount = element.getAsJsonObject().get("kakao_account").getAsJsonObject();

            String nickname = properties.getAsJsonObject().get("nickname").getAsString();
            // 에러나면 얘때문임
            String profileImage = properties.getAsJsonObject().get("image").getAsString();
            String email = kakaoAccount.getAsJsonObject().get("email").getAsString();

            userInfo.put("nickname",nickname);
            userInfo.put("email", email);

            System.out.println("profileImage : "+profileImage);
            userInfo.put("profileImage",profileImage);

        }catch(IOException e){
            e.printStackTrace();
        }

        return userInfo;
    }
}
