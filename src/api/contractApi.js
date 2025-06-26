import { axiosInstance } from './axiosInstance';

const openContractPdf = (fileUrl, label = '계약서') => {
  console.log(`${label} URL:`, fileUrl);
  window.open(fileUrl, '_blank');
};

// 계약 체결
export const generateContract = async (requestId, responseId) => {
  try {
    const response = await axiosInstance.post(`/api/contracts/${requestId}/${responseId}/generate`);
    openContractPdf(response.data.data, '계약서 생성');
  } catch (error) {
    console.error('계약서 생성 실패:', error);
    alert(error.response?.data?.message || '계약서 생성 중 오류 발생');
  }
};

// 계약서 조회
export const getContractUrl = async (contractId) => {
  try {
    const response = await axiosInstance.get(`/api/contracts/${contractId}/file-url`);
    openContractPdf(response.data.data, '계약서 조회');
  } catch (error) {
    console.error('계약서 URL 조회 실패:', error);
    alert(error.response?.data?.message || '계약서 URL 조회 중 오류 발생');
  }
};


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
  console.log('fetchContractDetail',requestId, responseId );
  try{
    const res = await axiosInstance.get(
      `/estimate-service/api/contracts/${requestId}/${responseId}`
    );
    return res.data.data;
  } catch (error) {
  console.error('상세정보 에러:', error); 
}
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