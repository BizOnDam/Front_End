import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useService } from '../contexts/ServiceContext';
import { useAuth } from '../contexts/AuthContext';

function Home() {
  const navigate = useNavigate();
  const { switchToSupplier, switchToBuyer } = useService();
  const { user, login } = useAuth();  // 전역 User
  console.log('Home.jsx user:', user); // user prop 값 확인

  useEffect(() => {
    // 초기 진입 시 role 초기화
    if (user && user.role !== null) {
      login({ ...user, role: null });
    }
  }, []);

  // 전역 상태 supplier로 업데이트
  const handleSupplierClick = () => {
    console.log('공급업체 바로가기 클릭');
    switchToSupplier();   
    navigate('/supplier');
  };
  // 전역 상태 buyer로 업데이트
  const handleBuyerClick = () => {
    console.log('수요업체 바로가기 클릭');
    switchToBuyer();       
    navigate('/demand');
  };

  const handleLearnMore = () => {
    // 서비스 소개 섹션으로 스크롤
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="d-flex flex-column flex-grow-1">
        {/* Hero Section */}
        <div className="bg-primary text-white py-5 px-4">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h1 className="display-4 fw-bold mb-4">BizOnDam</h1>
              <p className="lead mb-4">
                기업 간 거래를 더 쉽고 안전하게<br />
                비즈온담과 함께하세요
              </p>
              {!user && (
                <button onClick={handleLearnMore} className="btn btn-light btn-lg px-4 py-2 rounded-pill">
                  서비스 알아보기
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Service Selection Section */}
        {user && (
          <div className="container-fluid py-5">
            <h2 className="text-center mt-4 mb-5 fw-bold">서비스 선택</h2>
            <div className="row justify-content-center g-4">
              <div className="col-md-5">
                <div className="card h-100 border-0 shadow-lg rounded-4 hover-shadow">
                  <div className="card-body text-center p-5">
                    <div className="mb-4">
                      <i className="bi bi-box-seam display-4 text-primary"></i>
                    </div>
                    <h3 className="card-title mb-4 fw-bold">공급 서비스</h3>
                    <p className="card-text mb-4 text-muted">
                      공급업체로서의 서비스를 이용하시려면<br />
                      공급 서비스를 선택해주세요
                    </p>
                    <button onClick={handleSupplierClick} className="btn btn-primary btn-lg px-4 py-2 rounded-pill">
                      공급 서비스 바로가기
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="card h-100 border-0 shadow-lg rounded-4 hover-shadow">
                  <div className="card-body text-center p-5">
                    <div className="mb-4">
                      <i className="bi bi-cart-check display-4 text-primary"></i>
                    </div>
                    <h3 className="card-title mb-4 fw-bold">수요 서비스</h3>
                    <p className="card-text mb-4 text-muted">
                      수요업체로서의 서비스를 이용하시려면<br />
                      수요 서비스를 선택해주세요
                    </p>
                    <button onClick={handleBuyerClick} className="btn btn-primary btn-lg px-4 py-2 rounded-pill">
                      수요 서비스 바로가기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        <div id="features" className="py-5" style={{ minHeight: '400px' }}>
          <div className="container-fluid">
            <h2 className="text-center mb-5 fw-bold">주요 기능</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-calculator display-4 text-primary"></i>
                    </div>
                    <h3 className="h5 mb-3 fw-bold">견적 관리</h3>
                    <p className="card-text text-muted">
                      견적 요청부터 발주까지<br />
                      한 곳에서 관리하세요
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-file-earmark-text display-4 text-primary"></i>
                    </div>
                    <h3 className="h5 mb-3 fw-bold">계약 관리</h3>
                    <p className="card-text text-muted">
                      계약서 작성부터 관리까지<br />
                      디지털로 처리하세요
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 hover-shadow">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="bi bi-clock-history display-4 text-primary"></i>
                    </div>
                    <h3 className="h5 mb-3 fw-bold">거래 이력</h3>
                    <p className="card-text mb-4 text-muted">
                      모든 거래 내역을<br />
                      한눈에 확인하세요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Home;
