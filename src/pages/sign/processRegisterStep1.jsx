import PropTypes from 'prop-types';

/**
 * 사업자 인증 유효성 검사 및 API 호출 함수
 * @param {object} form - { bizNumber, startDate, ceoName, companyName }
 * @param {function} setError - 에러 메시지 설정 함수
 * @param {function} setLoading - 로딩 상태 설정 함수
 * @param {function} onSuccess - 성공 콜백
 */
export async function process(form, setError, setLoading, onSuccess) {
  // 유효성 검사
  if (!/^\d{10}$/.test(form.bizNumber)) {
    setError('사업자등록번호는 10자리 숫자여야 합니다.');
    return;
  }
  if (!form.startDate) {
    setError('개업일자를 입력해 주세요.');
    return;
  }
  const date8 = form.startDate.replace(/-/g, '');
  if (!/^\d{8}$/.test(date8)) {
    setError('개업일자는 8자리(YYYYMMDD) 형식이어야 합니다.');
    return;
  }
  if (!form.ceoName) {
    setError('대표자명을 입력해 주세요.');
    return;
  }
  if (!form.companyName) {
    setError('기업명을 입력해 주세요.');
    return;
  }
  setError('');
  setLoading(true);
  try {
    const payload = {
      b_no: form.bizNumber,
      start_dt: date8,
      p_nm: form.ceoName,
      b_nm: form.companyName,
    };
    
    const res = await fetch('http://localhost:8082/company-service/api/companies/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) throw new Error('서버 오류가 발생했습니다.');
    const data = await res.json();
    
    if (!data.validBusinessNumber) {
      setError('사업자정보를 다시 확인해 주세요.');
      return;
    }

    if (data.validBusinessNumber && data.alreadyRegistered) {
      onSuccess({ 
        success: true, 
        redirectTo: 'RegisterStep3',
        data: { 
          bizNumber: form.bizNumber,
          startDate: form.startDate,
          ceoName: form.ceoName,
          companyName: form.companyName,
          companyId: data.companyId 
        },
        message: data.message
      });
    } else if (data.validBusinessNumber && !data.alreadyRegistered) {
      onSuccess({ 
        success: true, 
        redirectTo: 'RegisterStep2',
        data: form,
        message: data.message
      });
    }
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
}