import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function RegisterStep4() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SignNavbar/>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div className="container py-5" style={{ maxWidth: '800px' }}>
          <div className="bg-white rounded shadow-sm p-5 text-center">
            <div className="mb-4">
              <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="fw-bold mb-5">회원가입이 완료되었습니다!</h2>
            <p className="text-muted mb-5">
              BizOnDam 회원이 되신 것을 환영합니다.<br />
              로그인 후 서비스를 이용하실 수 있습니다.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <button 
                className="btn btn-primary px-5" 
                onClick={() => navigate('/login')}
              >
                로그인하기
              </button>
              <button 
                className="btn btn-outline-secondary px-5" 
                onClick={() => navigate('/')}
              >
                홈으로 이동
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default RegisterStep4; 