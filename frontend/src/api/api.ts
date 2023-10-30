import axios, { AxiosInstance } from 'axios';


const axiosWithAuth = (accessToken?: string): AxiosInstance => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const instance: AxiosInstance = axios.create({
    baseURL: '', // 여기에 기본 API URL을 넣어주세요.
    headers,
  });

  return instance;
};

export default axiosWithAuth;


// api 사용방법
// 토큰이 필요한 요청인 경우
// const axiosInstanceWithToken = axiosWithAuth('your-access-token');

// 토큰이 필요하지 않은 요청인 경우
// const axiosInstanceWithoutToken = axiosWithAuth();