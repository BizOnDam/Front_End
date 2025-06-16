import { safeFetchJson, handleApiError } from '../../utils/api';

// 아이디 중복 확인
export async function checkIdDuplicate(loginId, setError, setIsIdVerified, setForm) {
  if (!loginId) return setError('회원아이디를 입력해 주세요.');
  if (!/^[a-z0-9]{6,15}$/.test(loginId))
    return setError('회원아이디는 영문 소문자와 숫자 조합으로 6 ~ 15자 입력해 주세요.');

  try {
    const { data } = await safeFetchJson(
      `http://localhost:8081/user-service/api/users/check-login-id?loginId=${loginId}`
    );

    const isDuplicated = data.data === true;
    setIsIdVerified(!isDuplicated);
    setForm(prev => ({ ...prev, isIdVerified: !isDuplicated }));
    alert(data.message);
    setError('');
    return !isDuplicated;
  } catch (err) {
    handleApiError(err, setError, '아이디 중복확인 중 오류가 발생했습니다.');
    setIsIdVerified(false);
    setForm(prev => ({ ...prev, isIdVerified: false }));
    return false;
  }
}

// 인증번호 발송
export async function sendVerificationCode(authProvider, phoneNumber, email, setError, setIsCodeSent, setIsSendingCode) {
  try {
    let endpoint = '';
    let body = {};

    switch (authProvider) {
      case 'EMAIL':
        endpoint = 'http://localhost:8081/user-service/api/users/email-auth';
        body = { email };
        break;
      case 'PHONE':
        console.log('PASS 인증 요청:', { phoneNumber });
        setIsCodeSent(true);
        alert('인증번호가 발송되었습니다. (PASS 인증)');
        return true;
      default:
        setError('인증 방식을 선택해주세요.');
        return false;
    }

    setIsSendingCode(true);
    const { data } = await safeFetchJson(endpoint, 'POST', body);
    setIsCodeSent(true);
    alert(data.message || '인증번호가 발송되었습니다.');
    return true;
  } catch (err) {
    setIsCodeSent(false);
    handleApiError(err, setError, '인증번호 발송 중 오류가 발생했습니다.');
    return false;
  } finally {
    setIsSendingCode(false);
  }
}

// 인증번호 확인
export async function verifyCode(authProvider, phoneNumber, email, verifyCode, setError, setIsVerified, setIsVerifying, setForm) {
  try {
    let endpoint = '';
    let body = {};

    switch (authProvider) {
      case 'EMAIL':
        endpoint = 'http://localhost:8081/user-service/api/users/email-auth/verify';
        body = { email, code: verifyCode };
        break;
      case 'PHONE':
        console.log('PASS 인증 확인:', { phoneNumber, verifyCode });
        setIsVerified(true);
        setForm(prev => ({ ...prev, isVerified: true }));
        alert('인증이 완료되었습니다. (PASS 인증)');
        return true;
      default:
        setError('인증 방식을 선택해주세요.');
        return false;
    }

    setIsVerifying(true);
    const { data } = await safeFetchJson(endpoint, 'POST', body);
    setIsVerified(true);
    setForm(prev => ({ ...prev, isVerified: true }));
    alert(data.message || '인증이 완료되었습니다.');
    return true;
  } catch (err) {
    setIsVerified(false);
    setForm(prev => ({ ...prev, isVerified: false }));
    handleApiError(err, setError, '인증 확인 중 오류가 발생했습니다.');
    return false;
  } finally {
    setIsVerifying(false);
  }
}

// 회원가입 처리
export async function ProcessRegisterStep3(form, setError, setLoading, onSuccess) {
  setError('');

  const validations = [
    { valid: form.isIdVerified, message: '아이디 중복확인을 해주세요.' },
    { valid: form.loginPwd, message: '비밀번호를 입력해 주세요.' },
    {
      valid: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,12}$/.test(form.loginPwd),
      message: '비밀번호는 영문, 숫자, 특수문자를 모두 포함하고 8~12자리여야 합니다.',
    },
    { valid: form.loginPwdConfirm, message: '비밀번호 확인을 입력해 주세요.' },
    { valid: form.loginPwd === form.loginPwdConfirm, message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' },
    { valid: form.nameKr, message: '이름(한글)을 입력해 주세요.' },
    {
      valid: !form.nameEn || !/[가-힣]/.test(form.nameEn),
      message: '이름(영문)에는 한글을 입력할 수 없습니다.',
    },
    { valid: form.department, message: '부서를 입력해 주세요.' },
    { valid: form.position, message: '직위를 입력해 주세요.' },
    { valid: form.phoneNumber, message: '휴대폰번호를 입력해 주세요.' },
    { valid: form.email, message: '이메일을 입력해 주세요.' },
    {
      valid: /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email),
      message: '이메일 형식이 올바르지 않습니다.',
    },
    { valid: form.authProvider, message: '본인인증 방식을 선택해 주세요.' },
    { valid: form.isVerified, message: '본인인증을 완료해 주세요.' },
  ];

  for (const { valid, message } of validations) {
    if (!valid) {
      setError(message);
      return;
    }
  }

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
    authProvider: form.authProvider,
    isVerified: form.isVerified,
    code: form.verifyCode,
  };

  setLoading(true);
  try {
    const { data } = await safeFetchJson(
      'http://localhost:8081/user-service/api/users/register',
      'POST',
      requestBody
    );

    onSuccess(data);
  } catch (err) {
    handleApiError(err, setError, '회원가입 중 오류가 발생했습니다.');
  } finally {
    setLoading(false);
  }
}