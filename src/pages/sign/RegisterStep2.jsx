// src/pages/sign/RegisterStep2.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ProcessRegisterStep2 } from './ProcessRegisterStep2';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 다음 주소 검색 API 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [form, setForm] = useState({
    companyNameKr: state?.companyName || '',
    companyNameEn: '',
    ceoNameKr: state?.ceoName || '',
    ceoNameEn: '',
    startDate: state?.startDate || '',
    businessNumber: state?.bizNumber || '',
    phoneNumber: '',
    faxNumber: '',
    postcode: '',
    address: '',
    addressDetail: '',
    businessType: '',
    });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // 전화번호와 팩스번호 입력 시 하이픈 추가
    if (name === 'phoneNumber' || name === 'faxNumber') {
      const number = value.replace(/[^0-9]/g, ''); // 숫자만 추출
      let formattedNumber = '';
      
      if (number.length <= 2) {
        formattedNumber = number;
      } else if (number.length <= 6) {
        formattedNumber = `${number.slice(0, 2)}-${number.slice(2)}`;
      } else {
        formattedNumber = `${number.slice(0, 2)}-${number.slice(2, 5)}-${number.slice(5, 9)}`;
      }
      
      setForm(prev => ({
        ...prev,
        [name]: formattedNumber
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        // 도로명 주소 또는 지번 주소
        let addr = data.roadAddress || data.jibunAddress;
        
        // 우편번호와 주소 정보를 해당 필드에 넣음
        setForm(prev => ({
          ...prev,
          postcode: data.zonecode,
          address: addr
        }));
      }
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await ProcessRegisterStep2(form, setError, setLoading, (response) => {
      if (response.success) {
        navigate('/RegisterStep3', { 
          state: { 
            companyId: response.data.companyId,
            ...response.data
          } 
        });
      }
    });
  };

  return (
    <div>
      <SignNavbar/>

      {/* Main Content */}
      <div style={{ backgroundColor: '#e9eff6', minHeight: 'calc(100vh - 56px)' }}>
        <div className="container py-5" style={{ maxWidth: '800px' }}>
          <h2 className="text-center fw-bold mb-4">기업 정보 입력</h2>

          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <div className="d-flex justify-content-end align-items-end mb-3">
              <div>
                <span className="text-danger small mb-1">*</span>
                <span className="text-muted small ms-1 mb-1">표시가 된 곳은 필수항목입니다.</span>
              </div>
            </div>
            <form id="companyForm" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">사업자등록번호 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.bizNumber || ''} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label">개업일 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.startDate || ''} readOnly />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">회사명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.companyName || ''} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label">회사명(영문)</label>
                  <input type="text" className="form-control" name="companyNameEn" onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">대표자명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.ceoName || ''} readOnly />
                </div>
                <div className="col-md-6">
                  <label className="form-label">대표자명(영문)</label>
                  <input type="text" className="form-control" name="ceoNameEn" onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">대표 전화번호 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="phoneNumber" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">팩스번호</label>
                  <input type="text" className="form-control" name="faxNumber" onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">업태/업종 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="businessType" onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">우편번호 <span className="text-danger">*</span></label>
                <div className="input-group">
                  <input type="text" className="form-control" name="postcode" value={form.postcode} onChange={handleChange} />
                  <button type="button" className="btn btn-outline-secondary" onClick={handlePostcodeSearch}>주소검색</button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">주소 <span className="text-danger">*</span></label>
                <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">상세주소</label>
                <input type="text" className="form-control" name="addressDetail" value={form.addressDetail} onChange={handleChange} />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button type="button" className="btn btn-outline-secondary px-5" onClick={() => navigate('/RegisterStep1')}>이전단계</button>
                <button type="submit" className="btn btn-primary px-5" disabled={loading}>
                  {loading ? '저장 중...' : '다음단계'}
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

export default RegisterStep2;
