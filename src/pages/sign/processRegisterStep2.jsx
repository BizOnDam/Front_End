/**
 * 기업정보 저장 및 유효성 검사, API 호출 함수
 * @param {object} form - 기업정보 입력값
 * @param {function} setError - 에러 메시지 설정 함수
 * @param {function} setLoading - 로딩 상태 설정 함수
 * @param {function} onSuccess - 성공 콜백 (data => void)
 */
export async function processRegisterStep2(form, setError, setLoading, onSuccess) {
  setError('');

  // 유효성 검사
  if (!form.company_name_en) {
    setError('회사명(영문)을 입력해 주세요.');
    return;
  }
  if (/[가-힣]/.test(form.company_name_en)) {
    setError('회사명(영문)에는 한글을 입력할 수 없습니다.');
    return;
  }
  if (!form.phone_number) {
    setError('대표 전화번호를 입력해 주세요.');
    return;
  }
  if (form.ceo_name_en && /[가-힣]/.test(form.ceo_name_en)) {
    setError('대표자명(영문)에는 한글을 입력할 수 없습니다.');
    return;
  }

  setLoading(true);
  try {
    // 실제 API URL 및 데이터 구조에 맞게 수정
    const res = await fetch('/api/companies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('저장에 실패했습니다.');
    const data = await res.json();
    onSuccess(data);
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
} 