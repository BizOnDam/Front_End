import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { checkIdDuplicate, sendVerificationCode, verifyCode, processRegisterStep3 } from './processRegisterStep3';
import RegisterStep4 from './RegisterStep4';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep3() {
  const navigate = useNavigate();
  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleIdCheck = async () => {
    const loginId = document.querySelector('input[name="login_id"]').value;
    const result = await checkIdDuplicate(loginId, setError, setIsIdVerified);
    if (result) {
      alert('사용 가능한 아이디입니다.');
    }
  };

  const handleSendCode = async () => {
    const authProvider = document.querySelector('select[name="auth_provider"]').value;
    const phoneNumber = document.querySelector('input[name="phone_number"]').value;
    const email = document.querySelector('input[name="email"]').value;
    
    const result = await sendVerificationCode(authProvider, phoneNumber, email, setError, setIsCodeSent);
    if (result) {
      alert('인증번호가 발송되었습니다.');
    }
  };

  const handleVerifyCode = async () => {
    const authProvider = document.querySelector('select[name="auth_provider"]').value;
    const phoneNumber = document.querySelector('input[name="phone_number"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const verifyCode = document.querySelector('input[name="verify_code"]').value;
    
    const result = await verifyCode(authProvider, phoneNumber, email, verifyCode, setError, setIsVerified);
    if (result) {
      alert('인증이 완료되었습니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // API 연동 전 임시 처리
    navigate('/RegisterStep4');
    
    /* API 연동 시 사용할 코드
    const formData = {
      login_id: document.querySelector('input[name="login_id"]').value,
      login_pwd: document.querySelector('input[name="login_pwd"]').value,
      login_pwd_confirm: document.querySelector('input[name="login_pwd_confirm"]').value,
      name_kr: document.querySelector('input[name="name_kr"]').value,
      name_en: document.querySelector('input[name="name_en"]').value,
      department: document.querySelector('input[name="department"]').value,
      position: document.querySelector('input[name="position"]').value,
      role_desc: document.querySelector('input[name="role_desc"]').value,
      phone_number: document.querySelector('input[name="phone_number"]').value,
      email: document.querySelector('input[name="email"]').value,
      auth_provider: document.querySelector('select[name="auth_provider"]').value,
      verify_code: document.querySelector('input[name="verify_code"]').value,
      isIdVerified,
      isVerified
    };

    await processRegisterStep3(
      formData,
      setError,
      setIsLoading,
      () => navigate('/RegisterStep4')
    );
    */
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SignNavbar/>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div className="container py-5" style={{ maxWidth: '800px' }}>
          <h2 className="text-center fw-bold mb-4">회원 정보 입력</h2>
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-end align-items-end mb-3">
              <div>
                <span className="text-danger small mb-1">*</span>
                <span className="text-muted small ms-1 mb-1">표시가 된 곳은 필수항목입니다.</span>
              </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">회원아이디 <span className="text-danger">*</span></label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="login_id" placeholder="영문 또는 숫자 6~15자" required />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleIdCheck}>중복확인</button>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="login_pwd" placeholder="영문+숫자+특수문자 포함 8~12자" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">비밀번호 확인 <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="login_pwd_confirm" placeholder="비밀번호를 한 번 더 입력" required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당자명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="name_kr" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">담당자명(영문)</label>
                  <input type="text" className="form-control" name="name_en" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당자 부서 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="department" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">담당자 직위 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="position" required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당 업무</label>
                  <input type="text" className="form-control" name="role_desc" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">휴대폰번호 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="phone_number" placeholder="숫자만 입력" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">이메일 주소 <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" name="email" required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">본인인증</label>
                  <div className="input-group">
                    <select className="form-select" name="auth_provider">
                      <option value="">인증방식</option>
                      <option value="PASS">휴대폰</option>
                      <option value="EMAIL">이메일</option>
                    </select>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleSendCode}>인증번호발송</button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">인증번호 입력</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="verify_code" placeholder="인증번호 입력" disabled={!isCodeSent} />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleVerifyCode} disabled={!isCodeSent}>인증확인</button>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button type="submit" className="btn btn-primary px-5" disabled={isLoading}>
                  {isLoading ? '처리중...' : '가입하기'}
                </button>
                <button type="button" className="btn btn-outline-secondary px-5" onClick={() => navigate('/')}>취소</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default RegisterStep3; 