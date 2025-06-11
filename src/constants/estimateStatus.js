export const ESTIMATE_STATUS = {
  1: { label: '수신', button: true, badgeColor: 'warning'  },   // 확인/승인 버튼 노출, 노란색
  2: { label: '발신', badgeColor: 'success'  },   // 초록색
  3: { label: '계약체결', badgeColor: 'primary' },    // 파란색
  4: { label: '계약미체결', badgeColor: 'danger' }        // 빨간색
}; 

export const CONTRACT_STATUS = {
  COMPLETED: { label: '계약완료', badgeColor: 'primary' },
  IN_PROGRESS: { label: '진행중', badgeColor: 'success' },
  NOT_CONCLUDED: { label: '미채결', badgeColor: 'danger' }
};

export const getContractStatus = (contract) => {
  if (!contract) return CONTRACT_STATUS.NOT_CONCLUDED;
  return contract.tracking_number ? CONTRACT_STATUS.COMPLETED : CONTRACT_STATUS.IN_PROGRESS;
}; 