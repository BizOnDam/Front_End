import { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../api/authApi';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({
    loginId: '',
    loginPwd: '',
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login.jsx 로그인 시도:', form);
    try {
      // login 함수가 response.data 전체 반환한다고 가정
      const { success, message, data } = await login({
        loginId: form.loginId,
        loginPwd: form.loginPwd,
      });
      console.log('▶ 로그인 응답:', { success, message, data });

      if (!success) {
        throw new Error(message || '로그인 실패');
      }

      // 로그인 성공 시 정보 저장
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('loginId', data.loginId);
      localStorage.setItem('username', data.username);
      localStorage.setItem('companyId', data.companyId);
      localStorage.setItem('companyNameKr', data.companyNameKr);
      localStorage.setItem('roleInCompany', data.roleInCompany);

      alert('로그인 성공!');
      window.location.href = '/'; // 로그인 후 이동할 경로

    } catch (error) {
      const msg = error.response?.data?.message || error.message || '로그인 중 오류 발생';
      console.error('로그인 실패:', msg);
      alert(msg);
    }
  };

  return (
    <div style={{ backgroundColor: '#e9eff6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1 }}>
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
          <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }} className="bg-white rounded shadow-sm p-4">
            <h2 className="text-center mb-5 fw-bold text-primary">BizOnDam</h2>

            <div className="mb-3">
              <label className="form-label">아이디</label>
              <input
                type="text"
                className="form-control"
                name="loginId"
                value={form.loginId}
                onChange={handleChange}
                placeholder="가입한 아이디"
                required
              />
            </div>

            <div className="mb-2">
              <label className="form-label">비밀번호</label>
              <input
                type="password"
                className="form-control"
                name="loginPwd"
                value={form.loginPwd}
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
    </div>
  );
}

export default Login;