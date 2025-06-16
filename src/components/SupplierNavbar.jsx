import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SupplierNavbar({ active, user }) {
  const location = useLocation();
  const menu = [
    { name: '대시보드', path: '/supplier' },
    { name: '견적관리', path: '/estimateList' },
    { name: '계약/납품 일정', path: '/contracts' },
    { name: '회사거래이력', path: '/history' },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <div className="container">
          <Link to="/" className="navbar-brand text-decoration-none">BizOnDam</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              {menu.map((item) => (
                <li className="nav-item" key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link${(active === item.path || location.pathname === item.path) ? ' active fw-bold text-primary' : ''}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="d-flex align-items-center">
              <span className="me-3">안녕하세요, {user.username}님</span>
              <button className="btn btn-outline-primary">마이페이지</button>
            </div>
            </div>
        </div>
    </nav>
  );
}

export default SupplierNavbar;