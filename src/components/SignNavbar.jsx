import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SignNavbar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div className="container">
        <Link className="navbar-brand" to="/">BizOnDam</Link>
        <div className="ms-auto">
          {user ? (
            <div className="d-flex align-items-center">
              <span className="me-3">안녕하세요, {user.username}님</span>
              <button className="btn btn-outline-primary">마이페이지</button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-primary">로그인 / 회원가입</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default SignNavbar; 