import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DemandNavbar({ active }) {
  const location = useLocation();
  const menu = [
    { name: '대시보드', path: '/demand' },
    { name: '공급기업조회', path: '/demand/suppliersList' },
    { name: '견적관리', path: '/demand/estimate' },
    { name: '계약/납품 일정', path: '/demand/contracts' },
    { name: '거래이력', path: '/demand/history' },
  ];
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
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
        <button className="btn btn-primary">마이페이지</button>
      </div>
    </nav>
  );
}

export default DemandNavbar; 