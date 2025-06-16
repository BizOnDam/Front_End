import { Link } from 'react-router-dom';
import Footer from './Footer';

function CommonLayout({ children }) {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
        <Link to="/" className="navbar-brand text-decoration-none">BizOnDam</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
          </ul>
          <button className="btn btn-primary">마이페이지</button>
        </div>
      </nav>

      {/* 메인 컨텐츠 영역 */}
      <div className="flex-grow-1">
        {children}
      </div>

      <Footer/>
    </div>
  );
}

export default CommonLayout; 