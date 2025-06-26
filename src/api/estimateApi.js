// 서버 호출 함수
import { axiosInstance } from '../api/axiosInstance';
import { transformEstimateData } from '../utils/estimateTransform';

// 상세 조회
export const getEstimateDetail = async (requestId, responseId) => {
  const url = responseId
    ? `/estimate-service/api/contracts/${requestId}/${responseId}`
    : `/estimate-service/api/contracts/${requestId}`;
  const res = await axiosInstance.get(url);
  console.log("견적 상세 조회", res);
  return transformEstimateData(res.data.data);
};

// 견적 거절
export const rejectEstimate = async (requestId, role, userId) => {
  if (role === 'buyer') {
    await axiosInstance.patch(`/estimate-service/api/estimates/reject-buyer/${requestId}`);
  } else {
    await axiosInstance.put(`/estimate-service/api/estimates/reject-supplier/${requestId}`, null, {
      params: { supplierUserId: userId }
    });
  }
};

// // 견적 수락
// export const acceptEstimate = async (requestId) => {
//   await axiosInstance.patch(`/estimate-service/api/estimates/${requestId}/accept`);
// };

// 품목 조회
export const fetchCategories = async () => {
  const res = await axiosInstance.get(`/estimate-service/api/product-meta/categories`);
  return res.data;
};

// 세부 품목 조회
export const fetchDetailCategories = async (categoryName) => {
  const res = await axiosInstance.get(`/estimate-service/api/product-meta/details?category=${encodeURIComponent(categoryName)}`);
  return res.data;
};

// 요청 생성
export const createEstimateRequest = async (data) => {
  const res = await axiosInstance.post(`/estimate-service/api/estimates/create_request`, data);
  return res.data;
};

// 응답 생성
export const createEstimateResponse = async (data) => {
  const res = await axiosInstance.post(`/estimate-service/api/estimates/create_response`, data);
  return res.data;
};

export function handleApiError(err, setError, defaultMsg = '요청 처리 중 오류가 발생했습니다.') {
  console.error(err);
  setError(err.message || defaultMsg);
}