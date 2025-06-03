// src/pages/demand/demandData.jsx

// 전체 거래 현황 데이터
export const statsData = {
  totalTransactions: 150,
  activeContracts: 12,
  pendingQuotes: 5,
  completedDeliveries: 98
};

// 견적 관리 데이터
export const quoteData = [
  {
    id: "Q2024001",
    item: "전자부품",
    requestDate: "2024-03-20",
    dueDate: "2024-03-27",
    status: "대기중"
  },
  {
    id: "Q2024002",
    item: "반도체",
    requestDate: "2024-03-19",
    dueDate: "2024-03-26",
    status: "검토중"
  },
  {
    id: "Q2024003",
    item: "PCB",
    requestDate: "2024-03-18",
    dueDate: "2024-03-25",
    status: "완료"
  }
];

// 진행 중인 계약/납품 일정 데이터
export const contractData = [
  {
    id: "C2024001",
    supplier: "예시 기업 1",
    item: "전자부품",
    amount: "50,000,000원",
    deliveryDate: "2025-05-15",
    status: "진행중"
  },
  {
    id: "C2024002",
    supplier: "예시 기업 2",
    item: "반도체",
    amount: "75,000,000원",
    deliveryDate: "2025-05-20",
    status: "검수중"
  },
  {
    id: "C2024003",
    supplier: "예시 기업 3",
    item: "PCB",
    amount: "30,000,000원",
    deliveryDate: "2025-05-25",
    status: "납품예정"
  }
];

// 거래 이력 및 후기 데이터
export const historyData = [
  {
    id: "C2024001",
    supplier: "예시 기업 1",
    item: "전자부품",
    amount: "50,000,000원",
    completionDate: "2025-03-15",
    hasReview: false
  },
  {
    id: "C2024002",
    supplier: "예시 기업 2",
    item: "반도체",
    amount: "75,000,000원",
    completionDate: "2025-03-10",
    hasReview: true
  },
  {
    id: "C2024003",
    supplier: "예시 기업 3",
    item: "PCB",
    amount: "30,000,000원",
    completionDate: "2025-03-05",
    hasReview: false
  }
]; 