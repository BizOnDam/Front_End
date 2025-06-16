export async function ProcessRegisterStep2(form, setError, setLoading, onSuccess) {
  setError('');

  // 필수 입력값 유효성 검사
  if (!form.phoneNumber) {
    setError('대표 전화번호를 입력해 주세요.');
    return;
  }
  if (!form.businessType) {
    setError('업태/업종을 입력해 주세요.');
    return;
  }
  if (!form.postcode) {
    setError('우편번호를 입력해 주세요.');
    return;
  }
  if (!form.address) {
    setError('주소를 입력해 주세요.');
    return;
  }

  // 영문 입력값에 대한 한글 검사 (입력된 경우에만)
  if (form.companyNameEn && /[가-힣]/.test(form.companyNameEn)) {
    setError('회사명(영문)에는 한글을 입력할 수 없습니다.');
    return;
  }
  if (form.ceoNameEn && /[가-힣]/.test(form.ceoNameEn)) {
    setError('대표자명(영문)에는 한글을 입력할 수 없습니다.');
    return;
  }

  setLoading(true);
  try {
    const requestBody = {
      companyNameKr: form.companyNameKr,
      companyNameEn: form.companyNameEn || null,
      ceoNameKr: form.ceoNameKr,
      ceoNameEn: form.ceoNameEn || null,
      startDate: form.startDate,
      businessNumber: form.businessNumber,
      phoneNumber: form.phoneNumber,
      faxNumber: form.faxNumber || null,
      postcode: form.postcode,
      address: form.address,
      addressDetail: form.addressDetail || null,
      businessType: form.businessType
    };

    const res = await fetch('http://localhost:8082/company-service/api/companies/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const response = await res.json();
    
    if (!response.success) {
      throw new Error(response.message || '저장에 실패했습니다.');
    }

    onSuccess(response);
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
} 