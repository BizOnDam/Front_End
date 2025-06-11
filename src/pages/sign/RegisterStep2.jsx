// src/pages/sign/RegisterStep2.jsx
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
// import { processRegisterStep2 } from './processRegisterStep2';
import RegisterStep3 from './RegisterStep3';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    companyPhone: '',
    companyFax: '',
    companyEmail: '',
    postcode: '',
    address: '',
    addressDetail: '',
    businessType: '',
    loginId: '',
    loginPwd: '',
    confirmPwd: '',
    nameKr: '',
    nameEn: '',
    department: '',
    position: '',
    roleDesc: '',
    phoneNumber: '',
    email: '',
    roleInCompany: 'STAFF',
    authProvider: 'EMAIL',
    agreeMarketingEmail: true,
    agreeMarketingSms: true
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handlePostcodeSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = data.address;
        setForm((prev) => ({
          ...prev,
          postcode: data.zonecode,
          address: addr
        }));
      }
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/RegisterStep3', { state: form });
    // await processRegisterStep2(form, setError, setLoading, (data) => {
    //   navigate('/sign/RegisterStep3', { state: data });
    // });
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
                  <label className="form-label">회사명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.companyName || ''} readOnly />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">회사명(영문)</label>
                  <input type="text" className="form-control" name="company_name_en" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">대표자명(한글) <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.ceoName || ''} readOnly />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">대표자명(영문)</label>
                  <input type="text" className="form-control" name="ceo_name_en" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">개업일 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control bg-light" value={state?.startDate || ''} readOnly />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">대표 전화번호 <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" name="phone_number" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">팩스번호</label>
                  <input type="text" className="form-control" name="fax_number" onChange={handleChange} />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">업태/업종</label>
                  <input type="text" className="form-control" name="business_type" onChange={handleChange} />
                </div>
                <div className="col-md-6">
                  <label className="form-label">이메일</label>
                  <input type="email" className="form-control" name="email" onChange={handleChange} />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">우편번호</label>
                <div className="input-group">
                  <input type="text" className="form-control" name="postcode" value={form.postcode} onChange={handleChange} />
                  <button type="button" className="btn btn-outline-secondary" onClick={handlePostcodeSearch}>주소검색</button>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">주소</label>
                <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">상세주소</label>
                <input type="text" className="form-control" name="address_detail" value={form.addressDetail} onChange={handleChange} />
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
