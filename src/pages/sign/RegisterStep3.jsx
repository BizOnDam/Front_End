import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { checkIdDuplicate, sendVerificationCode, verifyCode, processRegisterStep3 } from './processRegisterStep3';
import RegisterStep4 from './RegisterStep4';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // companyId가 없으면 이전 단계로 리다이렉트
  useEffect(() => {
    if (!location.state?.companyId) {
      alert('회사 정보가 없습니다. 이전 단계부터 다시 진행해주세요.');
      navigate('/RegisterStep1');
    }
  }, [location.state, navigate]);

  const [isIdVerified, setIsIdVerified] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    companyId: location.state?.companyId || '',
    loginId: '',
    loginPwd: '',
    loginPwdConfirm: '',
    nameKr: '',
    nameEn: '',
    department: '',
    position: '',
    roleDesc: '',
    phoneNumber: '',
    email: '',
    authProvider: 'EMAIL',
    isIdVerified: true,
    isVerified: true
  });

  // companyId가 변경될 때마다 form 상태 업데이트
  useEffect(() => {
    if (location.state?.companyId) {
      setForm(prev => ({
        ...prev,
        companyId: location.state.companyId
      }));
    }
  }, [location.state?.companyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 핸드폰 번호 입력 시 하이픈 추가
    if (name === 'phoneNumber') {
      const phoneNumber = value.replace(/[^0-9]/g, ''); // 숫자만 추출
      let formattedNumber = '';
      
      if (phoneNumber.length <= 3) {
        formattedNumber = phoneNumber;
      } else if (phoneNumber.length <= 7) {
        formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
      } else {
        formattedNumber = `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
      }
      
      setForm(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleIdCheck = async () => {
    if (!form.loginId) {
      setError('회원아이디를 입력해 주세요.');
      return;
    }
    setForm(prev => ({ ...prev, isIdVerified: true }));  // 하드코딩
    alert('사용 가능한 아이디입니다.');
  };

  const handleSendCode = async () => {
    setForm(prev => ({ ...prev, isVerified: true }));  // 하드코딩
    setIsCodeSent(true);
    alert('인증번호가 발송되었습니다.');
  };

  const handleVerifyCode = async () => {
    setForm(prev => ({ ...prev, isVerified: true }));  // 하드코딩
    setIsVerified(true);
    alert('인증이 완료되었습니다.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('제출된 폼 데이터:', form);  // 디버깅용 로그
    await processRegisterStep3(form, setError, setIsLoading, (response) => {
      if (response.success) {
        navigate('/RegisterStep4', { 
          state: { 
            ...response.data,
            message: response.message 
          } 
        });
      }
    });
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
                    <input type="text" className="form-control" name="loginId" value={form.loginId} onChange={handleChange} placeholder="영문 또는 숫자 6~15자" required />
                    <button type="button" className="btn btn-outline-secondary" onClick={handleIdCheck}>중복확인</button>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">비밀번호 <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="loginPwd" value={form.loginPwd} onChange={handleChange} placeholder="영문+숫자+특수문자 포함 8~12자" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">비밀번호 확인 <span className="text-danger">*</span></label>
                  <input type="password" className="form-control" name="loginPwdConfirm" value={form.loginPwdConfirm} onChange={handleChange} placeholder="비밀번호를 한 번 더 입력" required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당자명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="nameKr" value={form.nameKr} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">담당자명(영문)</label>
                  <input type="text" className="form-control" name="nameEn" value={form.nameEn} onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당자 부서 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="department" value={form.department} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">담당자 직위 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="position" value={form.position} onChange={handleChange} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">담당 업무</label>
                  <input type="text" className="form-control" name="roleDesc" value={form.roleDesc} onChange={handleChange} />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">휴대폰번호 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="숫자만 입력" required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">이메일 주소 <span className="text-danger">*</span></label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">본인인증</label>
                  <div className="input-group">
                    <select className="form-select" name="authProvider" value={form.authProvider} onChange={handleChange} disabled>
                      <option value="EMAIL">이메일</option>
                    </select>
                    <button type="button" className="btn btn-outline-secondary" onClick={handleSendCode}>인증번호발송</button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label">인증번호 입력</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="verifyCode" placeholder="인증번호 입력" disabled={!isCodeSent} />
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