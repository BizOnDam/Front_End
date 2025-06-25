import axiosInstance from './axiosInstance';

// 진행중인 계약 리스트
export const fetchContracts = async ({ companyId, role, userId, userRole, date }) => {
  const params = {
    companyId,
    role,
    ...(date ? { date: date.toISOString().split('T')[0] } : {}),
  };
  const headers = {
    'X-User-Id': userId,
    'X-User-Role': userRole,
  };

  const res = await axiosInstance.get('/estimate-service/api/contracts/list', {
    params,
    headers,
  });

  return res.data.data;
};

// 계약 조회
export const fetchContractDetail = async (requestId, responseId) => {
  const res = await axiosInstance.get(
    `/estimate-service/api/contracts/${requestId}/${responseId}`
  );
  return res.data.data;
};

// 계약 이력 조회
export const getContractSummaries = async (companyId) => {
  const response = await axiosInstance.get('/estimate-service/api/contracts/contract-summary', {
    params: { companyId }
  });
  return response.data.data;
};

// 전체 거래 현황
export const fetchDashboardStats = async (companyId) => {
  const response = await axiosInstance.get(`/estimate-service/api/contracts/summary`, {
    params: { companyId }
  });
  return response.data.data;
};