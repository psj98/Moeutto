import axios, { AxiosInstance } from 'axios';

const token: string = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhM2FiM2ExNS00M2I0LTQ4OTYtYjFlMi0wM2Q2YWJhNWM2NmMiLCJleHAiOjE2OTg4OTQ4NzJ9.M2lG-y8D3yWXpnjjGIik1qMq5H_7Xu4Nqn3-MXFmIWLdyC6ys8IOFZ1SG3Uka9i7st_TKFLNtaHqxK7e35LrzA";

window.sessionStorage.setItem("accessToken", token);

// 인증 값이 필요 없는 경우
const axiosApi = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
  })

  return instance;
}

// 인증 값이 필요한 경우
const axiosWithAuth = (): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  // 토큰 가져오기
  const accessToken: string = window.sessionStorage.getItem('accessToken');

  if (accessToken) {
    headers.accessToken = `${accessToken}`;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // 여기에 기본 API URL을 넣어주세요.
    headers,
  });

  return instance;
};

export const defaultInstance = axiosApi;
export const authInstance = axiosWithAuth;
