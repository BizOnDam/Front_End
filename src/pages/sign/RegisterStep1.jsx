// src/pages/RegisterStep1.jsx
import { useState } from 'react';
import { ProcessRegisterStep1 } from './ProcessRegisterStep1';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import profileImg from '../../assets/profile.png';
import AppNavbar from '../../components/AppNavbar';
import Footer from '../../components/Footer';

// 한국어 로케일 등록
registerLocale('ko', ko);

function RegisterStep1() {
  const [form, setForm] = useState({
    bizNumber: '',
    startDate: '',
    ceoName: '',
    companyName: '',
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 전체 동의 체크박스 상태는 개별 동의 상태로부터 유도
  const agreeAll = agreeTerms && agreePrivacy;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAgreeTerms = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleAgreePrivacy = (e) => {
    setAgreePrivacy(e.target.checked);
  };

  const handleAgreeAll = (e) => {
    const checked = e.target.checked;
    setAgreeTerms(checked);
    setAgreePrivacy(checked);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      setForm({ ...form, startDate: `${year}${month}${day}` });
    } else {
      setForm({ ...form, startDate: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreeTerms || !agreePrivacy) {
      setError('이용약관 및 개인정보 수집에 동의해 주세요.');
      return;
    }
    
    await ProcessRegisterStep1(form, setError, setLoading, (result) => {
      if (result?.success) {
        console.log('페이지 이동 데이터:', {
          redirectTo: result.redirectTo,
          data: result.data,
          message: result.message
        });
        
        if (result.redirectTo === 'RegisterStep3') {
          navigate('/RegisterStep3', { 
            state: { 
              bizNumber: result.data.bizNumber,
              startDate: result.data.startDate,
              ceoName: result.data.ceoName,
              companyName: result.data.companyName,
              companyId: result.data.companyId,
              message: result.message 
            } 
          });
        } else {
          navigate('/RegisterStep2', { 
            state: { 
              ...result.data,
              message: result.message 
            } 
          });
        }
      }
    });
  };

  return (
    <div>
      <AppNavbar/>

      <div style={{ backgroundColor: '#e9eff6', minHeight: 'calc(100vh - 56px)' }}>
        <div className="container py-5" style={{ maxWidth: '700px' }}>
          <h2 className="text-center mb-4 fw-bold">기업회원 가입</h2>
          
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <div className="d-flex align-items-center mb-3">
              <img src={profileImg} alt="기업회원" width="90" height="90" className="me-3" />
              <div>
                <div className="fw-bold mb-1">기업회원 가입안내</div>
                <ul className="mb-0 small text-muted">
                  <li>기업회원은 담당자정보로 아이디 생성(회원가입)이 가능합니다.</li>
                  <li>기업회원 가입 이력이 없으면 최초 가입자가 대표 계정이 되며, 대표 계정은 부 아이디의 계정정보와 활동 정보를 관리할 수 있습니다.</li>
                  <li>대표 계정을 변경하고 싶으시면 1:1문의 바랍니다.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 약관 동의 영역 */}
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <div className="mb-3">
              <div className="fw-bold mb-2">이용약관</div>
              <div className="border rounded p-2 mb-2" style={{ background: '#f8f9fa', height: '200px', overflowY: 'auto' }}>
                <span className="text-primary">이용약관(필수)</span><br />
                <strong>제1조 (목적)</strong><br />
                본 약관은 BizOnDam(이하 '서비스')이 제공하는 모든 기업회원 서비스의 이용 조건, 절차 및 권리·의무 사항을 규정함을 목적으로 합니다.<br/><br />
                
                <strong>제2조 (회원 가입)</strong><br />
                기업회원은 본인의 사업자 등록정보를 기반으로 가입하며, 가입 시 제공된 정보는 정확하고 사실이어야 합니다.<br/><br />
                
                <strong>제3조 (서비스의 제공 및 변경)</strong><br />
                서비스는 기업 간 견적 요청, 응답, 계약 체결 등의 기능을 제공하며, 기술적 사유로 내용이 변경될 수 있습니다.<br/><br />
                
                <strong>제4조 (회원의 의무)</strong><br />
                회원은 서비스를 이용함에 있어 관계 법령 및 약관을 준수하여야 하며, 타인의 권리를 침해해서는 안 됩니다.<br/><br />
                
                <strong>제5조 (계정관리 및 해지)</strong><br />
                모든 회원은 자신의 계정 정보를 관리하고, 부정 사용 방지를 위해 비밀번호 등의 정보는 안전하게 보관해야 합니다.<br/>
                대표자는 소속 직원의 계정 이용을 제한하거나 해지할 수 있는 권한을 가집니다.<br/>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={handleAgreeTerms} />
                <label className="form-check-label" htmlFor="agreeTerms">위의 이용 약관에 동의합니다.</label>
              </div>
            </div>
            <div className="mb-3">
              <div className="fw-bold mb-2">개인정보취급방침</div>
                <div className="border rounded p-2 mb-2" style={{ background: '#f8f9fa', height: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                <span className="text-primary"><strong>개인정보 수집 및 이용 동의(필수)</strong></span><br />
                    BizOnDam은 기업회원 가입 및 서비스 이용을 위해 다음과 같은 개인정보를 수집합니다.<br /><br />
                    <strong>1. 수집 항목</strong><br />
                    - 회사 정보: 사업자등록번호, 회사명, 대표자명, 주소 등<br />
                    - 사용자 정보: 이름, 부서, 직책, 연락처(휴대전화), 이메일, 로그인 ID, 비밀번호<br /><br />

                    <strong>2. 수집 목적</strong><br />
                    - 회원가입 및 본인확인<br />
                    - 기업 간 견적 요청 및 응답 등 서비스 제공<br />
                    - 계약 및 납품 이력 관리<br />
                    - 민원처리 및 고객지원<br /><br />

                    <strong>3. 보유 및 이용기간</strong><br />
                    - 회원 탈퇴 시까지 (단, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간까지)
                </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="agreePrivacy" checked={agreePrivacy} onChange={handleAgreePrivacy} />
                <label className="form-check-label" htmlFor="agreePrivacy">위의 개인정보 취급 방침에 동의합니다.</label>
              </div>
            </div>
            <div className="form-check d-flex justify-content-end">
              <input className="form-check-input" type="checkbox" id="agreeAll" checked={agreeAll} onChange={handleAgreeAll} />
              <label className="form-check-label ms-2" htmlFor="agreeAll">전체 동의</label>
            </div>
          </div>

          {/* 사업자 인증 입력 영역 */}
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <h4 className="mb-4 text-center">사업자 인증</h4>
            {loading && <div className="text-center my-2">로딩 중...</div>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label d-block mb-2">사업자등록번호</label>
                  <input
                    type="text"
                    className="form-control"
                    name="bizNumber"
                    value={form.bizNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      setForm({ ...form, bizNumber: value });
                    }}
                    placeholder="숫자만 입력 (예: 1234567890)"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label d-block mb-2">개업일자</label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy/MM/dd"
                    className="form-control"
                    placeholderText="개업일자를 선택하세요"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    locale="ko"
                    formatMonthYear={(date) => `${date.getMonth() + 1}월`}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label d-block mb-2">대표자명</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ceoName"
                    value={form.ceoName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label d-block mb-2">기업명</label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary px-5">
                  인증하고 다음으로
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default RegisterStep1;
