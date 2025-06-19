import axios from 'axios';

// 계약 데이터에서 마감일 가져오기
export const getDueDate = (contract) => {
  return contract.request?.due_date || contract.created_at;
};

// 달력에 표시할 이벤트 데이터 생성
export const getEventsForDate = (date, contracts) => {
  const events = [];
  const toDateOnly = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  
  // 계약 데이터에서 이벤트 추가
  contracts.forEach(contract => {
    try {
      const contractDate = toDateOnly(new Date(contract.contractDate));
      const dueDate = toDateOnly(new Date(contract.dueDate));
      const targetDate = toDateOnly(date);

      if (contractDate.getTime() === targetDate.getTime()) {
        events.push({
          type: '계약체결',
          title: `${contract.supplierCompanyId} - ${contract.itemNames.join(', ')}`,
          date: contract.contractDate
        });
      }
      if (dueDate.getTime() === targetDate.getTime()) {
        events.push({
          type: '납품기한',
          title: `${contract.supplierCompanyId} - ${contract.itemNames.join(', ')}`,
          date: contract.dueDate
        });
      }
    } catch (e) {
      console.error('이벤트 날짜 처리 오류:', e);
    }
  });
  return events;
};

// 달력 타일 렌더링 커스터마이징
export const tileContent = (date, contracts) => {
  const events = getEventsForDate(date, contracts);
  if (events.length > 0) {
    return {
      type: 'dot',
      color: events[0].type === '계약체결' ? '#0d6efd' : '#198754'
    };
  }
  return null;
};

// 마감일 기준으로 정렬된 계약 목록 생성
export const getSortedContracts = (contracts) => {
  return [...contracts].sort((a, b) => {
    const aDate = new Date(a.dueDate);
    const bDate = new Date(b.dueDate);
    return bDate - aDate;
  });
};

// 페이지네이션 관련 계산
export const getPaginationData = (sortedContracts, currentPage, itemsPerPage) => {
  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContracts = sortedContracts.slice(startIndex, endIndex);

  return {
    totalPages,
    currentContracts
  };
};

// 통화 포맷팅
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount);
};

// 계약 상세 정보 가져오기
export const getContractDetails = (contract) => {
  if (!contract) return null;

  return {
    contractId: contract.contractId,
    supplierCompany: contract.supplierCompanyId,
    contractDate: contract.contractCreatedAt?.split('T')[0],
    dueDate: contract.dueDate,
    totalPrice: contract.totalPrice,
    paymentTerms: contract.paymentTerms,
    warranty: contract.warranty,
    specialTerms: contract.specialTerms,
    items: contract.items
  };
};

// 이벤트 핸들러들
export const handleViewContract = (contractId) => {
  // TODO 전자계약 보기 기능 구현
  console.log('View contract:', contractId);
};

export const handleDownloadContract = (contractId) => {
  // TODO 계약서 다운로드 기능 구현
  console.log('Download contract:', contractId);
};

export const fetchContractDetail = async (requestId, responseId) => {
  const res = await axios.get(`http://localhost:8083/api/contracts/${requestId}/${responseId}`);
  console.log('Modal data: ', res.data.data);
  return res.data.data;
}; 