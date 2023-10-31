import axios, { AxiosInstance } from 'axios';


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
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // 여기에 기본 API URL을 넣어주세요.
    headers,
  });

  return instance;
};

export const defaultInstance = axiosApi;
export const authInstance = axiosWithAuth;
