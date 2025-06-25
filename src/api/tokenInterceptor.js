import axiosInstance from './axiosInstance';

export function setupTokenInterceptor() {
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const message = error.response?.data?.message || '';
    const userId = localStorage.getItem('userId');
    const refreshToken = localStorage.getItem('refreshToken');

    // AccessToken 만료 시
    if (
      error.response?.status === 401 &&
      message.includes("토큰 만료") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post(
          '/user-service/api/auth/reissue-access-token',
          null,
          {
            params: { userId, refreshToken },
          }
        );

        const newAccessToken = res.data.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);

        // 헤더 다시 설정해서 원래 요청 재시도
        originalRequest.headers = {
          ...(originalRequest.headers || {}),
          Authorization: `Bearer ${newAccessToken}`,
        };
        return axiosInstance(originalRequest);
      } catch (accessError) {
        console.warn('AccessToken 재발급 실패, RefreshToken 시도');
        console.log("accessError: ", accessError);

        // RefreshToken까지 만료됐을 경우
        try {
          const res = await axiosInstance.post(
            '/user-service/api/auth/reissue-refresh-token',
            { userId, refreshToken }
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          originalRequest.headers = {
            ...(originalRequest.headers || {}),
            Authorization: `Bearer ${newAccessToken}`,
          };
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('RefreshToken 재발급 실패, 로그인 페이지로 이동');
          console.log("refreshError: ", refreshError);
          localStorage.clear(); // 혹시 모를 토큰 정리
          window.location.href = '/login';
        }
      }
    }

    return Promise.reject(error);
  }
);
}