import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../contexts/AuthContext';
import { useService } from '../contexts/ServiceContext';
import { logout as logoutApi } from '../api/authApi';

function AppNavbar() {
  const { user, logout: clearAuth } = useAuth();
  const { serviceType, resetServiceType } = useService();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logoutApi(user.userId, user.refreshToken);
      alert('로그아웃 완료');
      window.location.href = '/';
    } catch (err) {
      console.warn('로그아웃 실패', err);
    } finally {
      clearAuth();
    }
  };

  const handleLogoClick = () => {
    console.log('메인로고 클릭');
    resetServiceType();
  };

  const getMenu = () => {
    if (!user) return [];

    if (serviceType === 'supplier') {
      return [
        { name: '대시보드', path: '/supplier' },
        { name: '견적관리', path: '/estimateList' },
        { name: '계약/납품 일정', path: '/contracts' },
        { name: '회사거래이력', path: '/history' },
      ];
    }

    if (serviceType === 'buyer') {
      return [
        { name: '대시보드', path: '/demand' },
        { name: '공급기업조회', path: '/demand/suppliersList' },
        { name: '견적관리', path: '/estimateList' },
        { name: '계약/납품 일정', path: '/contracts' },
        { name: '회사거래이력', path: '/history' },
      ];
    }

    return [];
  };

  const menu = getMenu();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={handleLogoClick}>
          BizOnDam
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {menu.map((item) => (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link${location.pathname === item.path ? ' active fw-bold text-primary' : ''}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3">안녕하세요, {user.username}님</span>
                <Link to="/mypage" className="btn btn-outline-primary me-2">마이페이지</Link>
                <button className="btn btn-outline-secondary" onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login" className="btn btn-outline-primary">로그인 / 회원가입</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AppNavbar;
