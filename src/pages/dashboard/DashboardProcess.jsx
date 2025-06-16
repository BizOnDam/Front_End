import { supplierDetailData } from '../../data/supplierData';
import axios from 'axios';

// API 호출 함수들
export const fetchStatsData = async (user) => {
  try {
    const response = await axios.get(
      'http://localhost:8083/api/dashboard/stats',
      { params: { companyId: user.companyId } }
    );
    return response.data.data;
  } catch (error) {
    console.error('통계 데이터 조회 실패:', error);
    return getInitialStatsData();
  }
};

export const fetchQuoteData = async (user) => {
  try {
    const response = await axios.get(
      'http://localhost:8083/api/dashboard/quotes',
      { params: { companyId: user.companyId } }
    );
    return response.data.data;
  } catch (error) {
    console.error('견적 데이터 조회 실패:', error);
    return getInitialQuoteData();
  }
};

export const fetchContractData = async (user) => {
  try {
    const response = await axios.get(
      'http://localhost:8083/api/dashboard/contracts',
      { params: { companyId: user.companyId } }
    );
    return response.data.data;
  } catch (error) {
    console.error('계약 데이터 조회 실패:', error);
    return getInitialContractData();
  }
};

export const fetchHistoryData = async (user) => {
  try {
    const response = await axios.get(
      'http://localhost:8083/api/dashboard/history',
      { params: { companyId: user.companyId } }
    );
    return response.data.data;
  } catch (error) {
    console.error('거래 이력 데이터 조회 실패:', error);
    return getInitialHistoryData();
  }
};

// Mock 데이터 함수들 (API 실패 시 fallback으로 사용)
export const getInitialStatsData = () => {
  return {
    totalTransactions: 120,
    activeContracts: 3,
    pendingQuotes: 2,
    completedDeliveries: 115
  };
};

export const getInitialQuoteData = () => {
  return [
    { id: 1, title: '사무용품 공급 요청', status: '대기중', date: '2024-03-15', dueDate: '2024-03-20' },
    { id: 2, title: 'IT 장비 공급 요청', status: '검토중', date: '2024-03-14', dueDate: '2024-03-19' }
  ];
};

export const getInitialContractData = () => {
  return [
    { id: 1, title: '사무용 가구 공급', company: '비즈온담', status: '진행중', date: '2024-03-20', amount: '5,000,000원' },
    { id: 2, title: '컴퓨터 장비 공급', company: '테크솔루션', status: '진행중', date: '2024-03-18', amount: '3,000,000원' },
    { id: 3, title: '사무용품 공급', company: '오피스플러스', status: '진행중', date: '2024-03-15', amount: '1,000,000원' }
  ];
};

export const getInitialHistoryData = () => {
  return [
    { id: 1, title: '사무용품 공급', company: '비즈온담', status: '완료', date: '2024-03-10', amount: '2,000,000원' },
    { id: 2, title: 'IT 장비 공급', company: '테크솔루션', status: '완료', date: '2024-03-05', amount: '4,000,000원' },
    { id: 3, title: '사무실 인테리어', company: '스마트오피스', status: '완료', date: '2024-03-01', amount: '10,000,000원' }
  ];
};

export const getTopSuppliers = (maxRows) => {
  const suppliersToShow = [...supplierDetailData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, maxRows);
  while (suppliersToShow.length < maxRows) suppliersToShow.push(null);
  return suppliersToShow;
}; 