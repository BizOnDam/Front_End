import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: 실제 로그인 상태 확인 로직 구현
    // setUser(null);
    setUser({
      username: 'yungga',
      role: 'USER'
    }); // 임시로 yungga 사용자로 설정
  }, []);

  // 로그인하지 않은 경우의 홈 화면
  const renderDefaultHome = () => (
    <>
      {/* Hero Section */}
      <div className="bg-light text-center py-5">
        <h1 className="display-4 mt-5">공공데이터 기반 매칭 플랫폼</h1>
        <p className="lead text-muted">신뢰할 수 있는 공급자와 수요자를 연결해드립니다.</p>
        <button className="btn btn-primary btn-lg mt-3">서비스 알아보기</button>
      </div>

      {/* Feature Cards */}
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">공공조달 계약 정보</h5>
                <p className="card-text">조달청 데이터를 기반으로 한 실시간 계약 사례 확인</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">AI 추천 시스템</h5>
                <p className="card-text">OpenAI 모델 기반 유사 계약 분석 및 추천</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title">맞춤형 수요요청</h5>
                <p className="card-text">기업의 수요를 등록하고 최적의 공급자를 연결</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  // 로그인한 경우의 홈 화면
  const renderLoggedInHome = () => (
    <div style={{ backgroundColor: '#e9eff6', minHeight: 'calc(100vh - 56px)' }}>
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="row w-100" style={{ maxWidth: '700px' }}>
          <div className="col-md-6 mb-3 mb-md-0">
            <Link to="/supplier" className="text-decoration-none">
              <div className="card h-100 shadow-sm text-center p-5 bg-white hover-shadow" style={{ minHeight: '300px', transition: 'box-shadow 0.2s' }}>
                <h2 className="fw-bold mb-3 mt-4" style={{ whiteSpace: 'nowrap' }}>공급업체 바로가기</h2>
                <p className="text-muted mt-4">공공조달 공급사 서비스를 <br/>이용하려면 여기를 클릭하세요.</p>
              </div>
            </Link>
          </div>
          <div className="col-md-6">
            <Link to="/demand" className="text-decoration-none">
              <div className="card h-100 shadow-sm text-center p-5 bg-white hover-shadow" style={{ minHeight: '300px', transition: 'box-shadow 0.2s' }}>
                <h2 className="fw-bold mb-3 mt-4" style={{ whiteSpace: 'nowrap' }}>수요업체 바로가기</h2>
                <p className="text-muted mt-4">공공조달 수요사 서비스를 <br/>이용하려면 여기를 클릭하세요.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <Link to="/" className="navbar-brand text-decoration-none">BizOnDam</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
          </ul>
          {user ? (
            <button className="btn btn-primary">마이페이지</button>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">로그인 / 회원가입</Link>
          )}
        </div>
      </nav>

      {/* 메인 컨텐츠 영역 */}
      {user ? renderLoggedInHome() : renderDefaultHome()}

      <Footer/>
    </div>
  );
}

export default Home;
