import { formatDateToYYYYMMDD } from './dateUtils';

// 날짜별 계약 이벤트 추출
export const getEventsForDate = (date, contracts) => {
  if (!contracts || !Array.isArray(contracts)) return [];
  const target = formatDateToYYYYMMDD(date);

  const events = [];

  contracts.forEach(c => {
    if (c.contractDate === target) {
      events.push({
        contractId: c.contractId,
        title: c.itemNames?.join(', '),
        type: '계약체결'
      });
    }
    if (c.dueDate === target) {
      events.push({
        contractId: c.contractId,
        title: c.itemNames?.join(', '),
        type: '납품기한'
      });
    }
  });

  return events;
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