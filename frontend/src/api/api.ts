import axios, { AxiosInstance } from 'axios';

const token: string =
  'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI2YjE0YWU3My01MDk0LTQyZTAtOTYzMy0xY2NmNzNlODc0OGIiLCJleHAiOjE2OTg4OTA3MTN9.D8_wKCgkvgE5OXQ1dTyCaMay4NoO_eEnH6huxO_9HDFnA8HFcS-NKRwFnPuadea9xaAVPMCmIcpbUhWUu6fvEw';

window.sessionStorage.setItem('accessToken', token);

// 인증 값이 필요 없는 경우
const axiosApi = () => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
  });

  return instance;
};

// 인증 값이 필요한 경우
const axiosWithAuth = ({ ContentType }: { ContentType: string }): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': ContentType,
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
