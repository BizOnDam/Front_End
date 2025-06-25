// 날짜별 계약 이벤트 추출
export const getEventsForDate = (date, contracts) => {
  if (!contracts || !Array.isArray(contracts)) return [];
  const target = date.toISOString().split('T')[0];
  return contracts.filter(c => c.dueDate === target || c.contractDate === target)
    .map(c => ({
      title: c.itemNames?.join(', '),
      type: c.trackingNumber ? '계약체결' : '진행중'
    }));
};

// 납기 기준 정렬
export const getSortedContracts = (contracts) => {
  if (!Array.isArray(contracts)) {
    console.warn("contracts가 배열이 아님:", contracts);
    return [];
  }

  return contracts.sort((a, b) => new Date(a.contractDate) - new Date(b.contractDate));
};

// 페이지네이션
export const getPaginationData = (list, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(list.length / itemsPerPage);
  const offset = (currentPage - 1) * itemsPerPage;
  const currentContracts = list.slice(offset, offset + itemsPerPage);
  return { totalPages, currentContracts };
};

// 금액 포맷
export const formatCurrency = (amount) =>
  amount != null
    ? new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount)
    : '-';
