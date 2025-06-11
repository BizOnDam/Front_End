/**
 * 회원정보 입력 유효성 검사 및 API 호출 함수
 * @param {object} form - 회원정보 입력값
 * @param {function} setError - 에러 메시지 설정 함수
 * @param {function} setLoading - 로딩 상태 설정 함수
 * @param {function} onSuccess - 성공 콜백 (data => void)
 */

// 아이디 중복확인 함수 (하드코딩)
export async function checkIdDuplicate(loginId, setError, setIsIdVerified) {
  if (!loginId) {
    setError('회원아이디를 입력해 주세요.');
    return false;
  }
  setIsIdVerified(true);
  return true;
}

// 인증번호 발송 함수 (하드코딩)
export async function sendVerificationCode(authProvider, phoneNumber, email, setError, setIsCodeSent) {
  setIsCodeSent(true);
  return true;
}

// 인증번호 확인 함수 (하드코딩)
export async function verifyCode(authProvider, phoneNumber, email, verifyCode, setError, setIsVerified) {
  setIsVerified(true);
  return true;
}

export async function processRegisterStep3(form, setError, setLoading, onSuccess) {
  setError('');

  // 필수 입력값 검사
  if (!form.loginId) {
    setError('회원아이디를 입력해 주세요.');
    return;
  }
  if (/[가-힣]/.test(form.loginId)) {
    setError('회원아이디에는 한글을 입력할 수 없습니다.');
    return;
  }
  // 아이디 중복확인 여부 검사
  if (!form.isIdVerified) {
    setError('아이디 중복확인을 해주세요.');
    return;
  }
  if (!form.loginPwd) {
    setError('비밀번호를 입력해 주세요.');
    return;
  }
  // 비밀번호 유효성 검사: 영문+숫자+특수문자 포함 8~12자리
  if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/.test(form.loginPwd)) {
    setError('비밀번호는 영문, 숫자, 특수문자를 모두 포함하고 8~12자리여야 합니다.');
    return;
  }
  if (!form.loginPwdConfirm) {
    setError('비밀번호 확인을 입력해 주세요.');
    return;
  }
  if (form.loginPwd !== form.loginPwdConfirm) {
    setError('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    return;
  }
  if (!form.nameKr) {
    setError('이름(한글)을 입력해 주세요.');
    return;
  }
  if (form.nameEn && /[가-힣]/.test(form.nameEn)) {
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
  if (!form.phoneNumber) {
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
  // if (!form.auth_provider) {
  //   setError('본인인증 방식을 선택해 주세요.');
  //   return;
  // }
  // if (!form.isVerified) {
  //   setError('본인인증을 완료해 주세요.');
  //   return;
  // }

  setLoading(true);
  try {
    const requestBody = {
      companyId: form.companyId,
      email: form.email,
      loginId: form.loginId,
      loginPwd: form.loginPwd,
      nameKr: form.nameKr,
      nameEn: form.nameEn || null,
      department: form.department,
      position: form.position,
      roleDesc: form.roleDesc || null,
      phoneNumber: form.phoneNumber,
      authProvider: 'EMAIL'
    };

    console.log('API 요청 데이터:', requestBody);  // 디버깅용 로그

    const res = await fetch('http://localhost:8081/user-service/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const response = await res.json();
    console.log('API 응답:', response);  // API 응답 로깅
    
    if (!res.ok) {
      throw new Error(response.message || `서버 오류 (${res.status}): ${JSON.stringify(response)}`);
    }

    if (!response.success) {
      throw new Error(response.message || '회원가입에 실패했습니다.');
    }

    onSuccess(response);
  } catch (err) {
    console.error('회원가입 에러:', err);  // 에러 상세 로깅
    setError(err.message || '네트워크 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
} 