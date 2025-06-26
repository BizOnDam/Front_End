import { axiosSignInstance } from '../../api/axiosInstance';

export async function ProcessRegisterStep1(form, setError, setLoading, onSuccess) {
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
    
    const res = await axiosSignInstance.post(
      '/company-service/api/companies/validate',
      payload
    );
  
    const data = res.data;
    
    // 디버깅을 위한 응답 데이터 출력
    console.log('API Response:', data);
    console.log('validBusinessNumber:', data.data?.validBusinessNumber);
    console.log('alreadyRegistered:', data.data?.alreadyRegistered);
    
    if (!data.data?.validBusinessNumber) {
      setError('사업자정보를 다시 확인해 주세요.');
      return;
    }

    if (data.data?.validBusinessNumber && data.data?.alreadyRegistered) {
      onSuccess({ 
        success: true, 
        redirectTo: 'RegisterStep3',
        data: { 
          bizNumber: form.bizNumber,
          startDate: form.startDate,
          ceoName: form.ceoName,
          companyName: form.companyName,
          companyId: data.data.companyId 
        },
        message: data.data.message
      });
    } else if (data.data?.validBusinessNumber && !data.data?.alreadyRegistered) {
      onSuccess({ 
        success: true, 
        redirectTo: 'RegisterStep2',
        data: form,
        message: data.data.message
      });
    }
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
}