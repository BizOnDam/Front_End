import axios from 'axios';

// VITE_API_SERVER_URL
// VITE_API_LOCAL_URL

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL, // Gateway 주소
  withCredentials: true,  // 쿠키 포함
  timeout: 30000, // 30초 제한
});

// 헤더 x
export const axiosSignInstance = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL, // Gateway 주소
  withCredentials: true,  // 쿠키 포함
  timeout: 30000, // 30초 제한
});

// 요청 전에 accessToken 붙이기
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// AccessToken 만료 시 RefreshToken으로 재발급 요청
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message || '';

    if (
      // error.response?.status === 401 &&
      (error.response?.status === 401 || error.response?.status === 500) &&
      message.includes("토큰 만료") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.post(
          '/user-service/api/auth/reissue-access-token',
          null,
          {
            params: {
              userId: localStorage.getItem('userId'),
              refreshToken: localStorage.getItem('refreshToken'),
            },
          }
        );

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axiosInstance(originalRequest); // 재요청
      } catch (refreshError) {
        console.error('토큰 갱신 실패', refreshError);
        window.location.href = '/login'; // 로그인 페이지로 보내기
      }
    }

    return Promise.reject(error);
  }
);