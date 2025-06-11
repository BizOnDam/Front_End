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
      bizNumber: form.bizNumber,
      startDate: date8,
      ceoName: form.ceoName,
      companyName: form.companyName,
    };
    // TODO: API URL 변경
    const res = await fetch('/api/companies/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('서버 오류가 발생했습니다.');
    const data = await res.json();
    if (data.success) {
      onSuccess(data);
    } else {
      setError(data.message || '인증에 실패했습니다.');
    }
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
}

// RegisterStep1process.propTypes = {
//   form: PropTypes.shape({
//     bizNumber: PropTypes.string.isRequired,
//     startDate: PropTypes.string.isRequired,
//     ceoName: PropTypes.string.isRequired,
//     companyName: PropTypes.string.isRequired,
//   }).isRequired,
//   setError: PropTypes.func.isRequired,
//   setLoading: PropTypes.func.isRequired,
//   onSuccess: PropTypes.func.isRequired,
// }; 