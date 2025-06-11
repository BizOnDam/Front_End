// src/pages/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterStep1 from './RegisterStep1';
import SignNavbar from '../../components/SignNavbar';
import Footer from '../../components/Footer';

function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('▶ 로그인 시도:', form);
    // TODO: 로그인 API 연동
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <SignNavbar/>
    
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }} className="bg-white rounded shadow-sm p-4">
        <h2 className="text-center mb-5 fw-bold text-primary">BizOnDam</h2>

        <div className="mb-3">
          <label className="form-label">아이디</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="이메일 또는 아이디"
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">비밀번호</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={form.rememberMe}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="rememberMe">
            로그인 상태 유지
          </label>
        </div>

        <button type="submit" className="btn btn-primary w-100">로그인</button>

        <div className="text-center mt-4 text-muted small">
              아이디 찾기 | 비밀번호 찾기 | <Link to="/RegisterStep1">회원가입</Link>
            </div>
          </form>
        </div>
      </div>
      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Login;