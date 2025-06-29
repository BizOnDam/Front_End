import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useService } from '../../contexts/ServiceContext';
import BasicInfoCard from './components/BasicInfoCard';
import CompanyInfoCard from './components/CompanyInfoCard';
import QuickMenuCard from './components/QuickMenuCard';
import { useMyPageForm } from './hooks/useMyPageForm';
import { logout as logoutApi } from '../../api/authApi';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import LoadingOrError from '../../components/LoadingOrError';

function MyPage() {
  const { user, logout } = useAuth();
  const { switchToSupplier, switchToBuyer } = useService();
  const navigate = useNavigate();

  const {
    isEditing, setIsEditing,
    editForm, handleInputChange, handleSave, handleCancel,
    openBasic, setOpenBasic,
    openCompany, setOpenCompany,
    openMenu, setOpenMenu,
    selectedRole, setSelectedRole,
    loading, error, saving
  } = useMyPageForm(user);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (loading || error) {
    return <LoadingOrError loading={loading} error={error} />;
  }

  // 서비스 선택 핸들러
  const handleMenuClick = (path) => {
    selectedRole === 'supplier' ? switchToSupplier() : switchToBuyer();
    navigate(path);
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    try {
      await logoutApi(user.userId, user.refreshToken);
      setTimeout(() => {
        alert('로그아웃 되었습니다.');
        window.location.href = '/';
      }, 100); // 0.1초 지연      
    } catch (err) {
      console.warn('로그아웃 실패:', err);
      alert('로그아웃 중 오류가 발생했습니다.');
    } finally {
      logout(); // AuthContext에서 사용자 정보 제거
    }
  };

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-12">
          {/* 헤더 */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="h2 fw-bold text-primary">
              <FaUserCircle className="me-2" /> 마이페이지
            </h1>
            <button onClick={handleLogout} className="btn btn-outline-danger">
              <FaSignOutAlt className="me-1" /> 로그아웃
            </button>
          </div>

          {/* 섹션들 */}
          <BasicInfoCard
            user={editForm}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            editForm={editForm}
            handleInputChange={handleInputChange}
            handleSave={handleSave}
            handleCancel={handleCancel}
            openBasic={openBasic}
            setOpenBasic={setOpenBasic}
            saving={saving}
          />

          <CompanyInfoCard
            user={openCompany}
            openCompany={openCompany}
            setOpenCompany={setOpenCompany}
          />

          <QuickMenuCard
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            handleMenuClick={handleMenuClick}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
