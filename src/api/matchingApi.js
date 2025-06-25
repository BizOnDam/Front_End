import axiosInstance from './axiosInstance';

export const fetchMatchingData = async (requestId, accessToken) => {
  console.log('▶ fetchMatchingData ccessToken:', accessToken); // 토큰 확인용 로그

  const response = await axiosInstance.get(`/matching-service/api/recommend/${requestId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return response.data.data;
};

export const assignSupplier = async (requestId, businessNumber) => {
  const response = await axiosInstance.patch(
    `/estimate-service/api/estimates/${requestId}/assign-supplier`,
    null,
    { params: { businessNumber } }
  );
  return response.data;
};
