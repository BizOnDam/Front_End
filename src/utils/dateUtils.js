// YYYY-MM-DD 형식으로 변환
export const formatDateToYYYYMMDD = (input) => {
  const date = new Date(input); // 문자열이든 Date든 처리
  if (isNaN(date)) return '';   // 유효하지 않은 날짜는 빈 문자열 반환

  const tzOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - tzOffset);
  return localDate.toISOString().split('T')[0];
};

// 화폐 포맷
export const formatCurrency = amount => {
  return amount != null
    ? new Intl.NumberFormat('ko-KR', { 
        style: 'currency', 
        currency: 'KRW' 
    }).format(amount)
    : '-';
};