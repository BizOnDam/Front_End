// src/pages/RegisterStep1.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileImg from '../../assets/profile.png';
import { process as processRegisterStep1 } from './processRegisterStep1';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep1() {
  const [form, setForm] = useState({
    bizNumber: '',
    startDate: '',
    ceoName: '',
    companyName: '',
  });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!agreeTerms || !agreePrivacy) {
      setError('이용약관 및 개인정보 수집에 동의해 주세요.');
      return;
    }
    
    await processRegisterStep1(form, setError, setLoading, (result) => {
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
      <SignNavbar/>

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
              <div className="border rounded p-2 mb-2" style={{ background: '#f8f9fa', height: '100px', overflowY: 'auto' }}>
                <span className="text-primary">이용약관(필수)</span><br />
                제 1조 목적<br />
                1. 이 약관은 ~~~~
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={handleAgreeTerms} />
                <label className="form-check-label" htmlFor="agreeTerms">위의 이용 약관에 동의합니다.</label>
              </div>
            </div>
            <div className="mb-3">
              <div className="fw-bold mb-2">개인정보취급방침</div>
              <div className="border rounded p-2 mb-2" style={{ background: '#f8f9fa', height: '80px', overflowY: 'auto' }}>
                <span className="text-primary">개인정보 취급방침</span><br />
                비즈온담은 ~
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
              <div className="mb-3">
                <label className="form-label">사업자등록번호</label>
                <input
                  type="text"
                  className="form-control"
                  name="bizNumber"
                  value={form.bizNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 남기기
                    setForm({ ...form, bizNumber: value });
                  }}
                  placeholder="숫자만 입력 (예: 1234567890)"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">개업일자</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">대표자명</label>
                <input
                  type="text"
                  className="form-control"
                  name="ceoName"
                  value={form.ceoName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">기업명</label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={form.companyName}
                  onChange={handleChange}
                  required
                />
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
