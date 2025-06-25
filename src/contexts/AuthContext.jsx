import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user 객체

  useEffect(() => {
    // 새로고침 시 localStorage에서 유저 정보 불러오기
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('accessToken', userData.accessToken);
    localStorage.setItem('refreshToken', userData.refreshToken);
    localStorage.setItem('userId', userData.userId); 
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); // 토큰도 같이 날리기
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    console.log(localStorage.getItem('user'));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
