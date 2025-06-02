/**
 * 회원정보 입력 유효성 검사 및 API 호출 함수
 * @param {object} form - 회원정보 입력값
 * @param {function} setError - 에러 메시지 설정 함수
 * @param {function} setLoading - 로딩 상태 설정 함수
 * @param {function} onSuccess - 성공 콜백 (data => void)
 */

// 아이디 중복확인 함수
export async function checkIdDuplicate(loginId, setError, setIsIdVerified) {
  if (!loginId) {
    setError('회원아이디를 입력해 주세요.');
    return false;
  }
  try {
    const res = await fetch(`/api/users/check-id?login_id=${loginId}`);
    if (!res.ok) throw new Error('중복확인에 실패했습니다.');
    const data = await res.json();
    if (data.isDuplicate) {
      setError('이미 사용 중인 아이디입니다.');
      setIsIdVerified(false);
      return false;
    } else {
      setError('');
      setIsIdVerified(true);
      return true;
    }
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
    return false;
  }
}

// 인증번호 발송 함수
export async function sendVerificationCode(authProvider, phoneNumber, email, setError, setIsCodeSent) {
  if (!authProvider) {
    setError('인증방식을 선택해 주세요.');
    return false;
  }

  try {
    const endpoint = authProvider === 'PASS' ? '/api/auth/send-sms' : '/api/auth/send-email';
    const data = authProvider === 'PASS' ? { phoneNumber } : { email };
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('인증번호 발송에 실패했습니다.');
    
    setIsCodeSent(true);
    setError('');
    return true;
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
    return false;
  }
}

// 인증번호 확인 함수
export async function verifyCode(authProvider, phoneNumber, email, verifyCode, setError, setIsVerified) {
  if (!verifyCode) {
    setError('인증번호를 입력해 주세요.');
    return false;
  }

  try {
    const endpoint = authProvider === 'PASS' ? '/api/auth/verify-sms' : '/api/auth/verify-email';
    const data = authProvider === 'PASS' 
      ? { phoneNumber, verifyCode }
      : { email, verifyCode };
    
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('인증번호 확인에 실패했습니다.');
    
    const result = await res.json();
    if (result.isVerified) {
      setIsVerified(true);
      setError('');
      return true;
    } else {
      setError('인증번호가 일치하지 않습니다.');
      return false;
    }
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
    return false;
  }
}

export async function processRegisterStep3(form, setError, setLoading, onSuccess) {
  setError('');

  // 필수 입력값 검사
  if (!form.login_id) {
    setError('회원아이디를 입력해 주세요.');
    return;
  }
  if (/[가-힣]/.test(form.login_id)) {
    setError('회원아이디에는 한글을 입력할 수 없습니다.');
    return;
  }
  // 아이디 중복확인 여부 검사
  if (!form.isIdVerified) {
    setError('아이디 중복확인을 해주세요.');
    return;
  }
  if (!form.login_pwd) {
    setError('비밀번호를 입력해 주세요.');
    return;
  }
  // 비밀번호 유효성 검사: 영문+숫자+특수문자 포함 8~12자리
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/.test(form.login_pwd)) {
    setError('비밀번호는 영문, 숫자, 특수문자를 모두 포함하고 8~12자리여야 합니다.');
    return;
  }
  if (!form.login_pwd_confirm) {
    setError('비밀번호 확인을 입력해 주세요.');
    return;
  }
  if (form.login_pwd !== form.login_pwd_confirm) {
    setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return;
  }
  if (!form.name_kr) {
    setError('이름(한글)을 입력해 주세요.');
    return;
  }
  if (form.name_en && /[가-힣]/.test(form.name_en)) {
    setError('이름(영문)에는 한글을 입력할 수 없습니다.');
    return;
  }
  if (!form.department) {
    setError('부서를 입력해 주세요.');
    return;
  }
  if (!form.position) {
    setError('직위를 입력해 주세요.');
    return;
  }
  if (!form.phone_number) {
    setError('휴대폰번호를 입력해 주세요.');
    return;
  }
  if (!form.email) {
    setError('이메일을 입력해 주세요.');
    return;
  }
  // 이메일 형식 검사
  if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
    setError('이메일 형식이 올바르지 않습니다.');
    return;
  }

  // 본인인증 여부 검사
  if (!form.auth_provider) {
    setError('본인인증 방식을 선택해 주세요.');
    return;
  }
  if (!form.isVerified) {
    setError('본인인증을 완료해 주세요.');
    return;
  }

  setLoading(true);
  try {
    // 실제 API URL 및 데이터 구조에 맞게 수정
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('회원가입에 실패했습니다.');
    const data = await res.json();
    onSuccess(data);
  } catch (err) {
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
} 