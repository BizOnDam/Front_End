import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthVerifyBox from '../../../components/AuthVerifyBox';
import { FaInfoCircle, FaEdit, FaTimes, FaChevronUp, FaChevronDown, FaSpinner, FaKey } from 'react-icons/fa';

function BasicInfoCard({
  user, isEditing, editForm, openBasic, setOpenBasic,
  handleInputChange, handleSave, handleCancel, setIsEditing, saving
}) {
  const navigate = useNavigate();

  const handlePasswordChange = () => {
    navigate('/find-password');
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-header bg-primary text-white rounded-top-4" style={{cursor:'pointer'}}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaInfoCircle className="me-2" size={16} />
            기본 정보
          </h5>
          <div className="d-flex align-items-center gap-2">
            {/* <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-light btn-sm px-3 fw-bold"
              style={{minWidth:'60px'}}
              disabled={saving}
            >
              {isEditing ? (
                <><FaTimes className="me-1" size={14}/>취소</>
              ) : (
                <><FaEdit className="me-1" size={14}/>수정</>
              )}
            </button> */}
            {/* 비밀번호 변경 버튼 */}
            <div className="col-12">
              <button onClick={handlePasswordChange} className="btn btn-outline-secondary w-100 p-3 rounded-3">
                <FaKey /> <span className="ms-2">비밀번호 변경</span>
              </button>
            </div>
            <span style={{cursor:'pointer'}} onClick={() => setOpenBasic(v => !v)}>
              {openBasic ? <FaChevronUp /> : <FaChevronDown />}
            </span>
          </div>
        </div>
      </div>
      {openBasic && (
        <div className="card-body p-4">
          {!isEditing ? (
            <div className="row">
              {[
                { label: '소속 회사명', value: user?.companyNameKr },
                { label: '사용자 ID', value: user?.loginId },
                { label: '이름 (한국어)', value: user?.nameKr },
                { label: '이름 (영어)', value: user?.nameEn },
                { label: '이메일', value: user?.email },
                { label: '전화번호', value: user?.phoneNumber },
                { label: '부서', value: user?.department },
                { label: '직책', value: user?.position },
                { label: '담당 업무', value: user?.roleDesc },
                { label: '가입일', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '-' }
              ].map((item) => (
                <div key={item.label} className="col-md-6 mb-3">
                  <label className="form-label fw-bold text-black">{item.label}</label>
                  <p className="form-control-plaintext">{item.value || '-'}</p>
                </div>
              ))}
            </div>
          ) : (
            <form>
              <div className="row">
                {/* 읽기 전용 필드: 소속 회사명, 사용자 ID, 이름 */}
                {[
                  { label: '소속 회사명', value: user?.companyNameKr },
                  { label: '사용자 ID', value: user?.loginId },
                  { label: '이름 (한국어)', value: user?.nameKr },
                  { label: '이름 (영어)', value: user?.nameEn }
                ].map((item) => (
                  <div key={item.label} className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-black">{item.label}</label>
                    <p className="form-control-plaintext">{item.value || '-'}</p>
                  </div>
                ))}

                {/* 수정 가능한 필드: 이메일, 전화번호 */}
                {["email", "phoneNumber"].map((field) => (
                  <div key={field} className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-black">{field === 'email' ? '이메일' : '전화번호'}</label>
                    <input
                      type="text"
                      className="form-control"
                      name={field}
                      value={editForm[field]}
                      onChange={handleInputChange}
                      disabled={saving}
                    />
                  </div>
                ))}
                {/* 본인인증 UI */}
                <AuthVerifyBox disabled={saving} />

                {/* 읽기 전용 필드: 부서, 직책, 담당 업무, 가입일  */}
                {[
                  { label: '부서', value: user?.department },
                  { label: '직책', value: user?.position },
                  { label: '담당 업무', value: user?.roleDesc },
                  { label: '가입일', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '-' }
                ].map((item) => (
                  <div key={item.label} className="col-md-6 mb-3">
                    <label className="form-label fw-bold text-black">{item.label}</label>
                    <p className="form-control-plaintext">{item.value || '-'}</p>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <button 
                  type="button" 
                  onClick={handleCancel} 
                  className="btn btn-secondary"
                  disabled={saving}
                >
                  취소
                </button>
                <button 
                  type="button" 
                  onClick={handleSave} 
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FaSpinner className="me-1" spin /> 저장 중...
                    </>
                  ) : (
                    '저장'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default BasicInfoCard;
