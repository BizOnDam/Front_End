import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaChevronUp, FaChevronDown, FaUsers } from 'react-icons/fa';

function CompanyInfoCard({ user, openCompany, setOpenCompany }) {
  const navigate = useNavigate();
  
  if (!user) return null;
  // camelCase로 통일
  const info = user.companyInfo || user;

  const fields = [
    ['회사명(한글)', info.companyNameKr],
    ['회사명(영문)', info.companyNameEn],
    ['대표자명(한글)', info.ceoNameKr],
    ['대표자명(영문)', info.ceoNameEn],
    ['개업일', info.startDate],
    ['사업자등록번호', info.businessNumber],
    ['대표 전화번호', info.phoneNumber],
    ['팩스번호', info.faxNumber],
    ['우편번호', info.postcode],
    ['주소', info.address],
    ['상세주소', info.addressDetail],
    ['업태/업종', info.businessType],
    ['가입일', info.createdAt]
  ];

  const handleStaffManagement = () => {
    navigate('/staffPage');
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-header bg-secondary text-white rounded-top-4" style={{cursor:'pointer'}} onClick={() => setOpenCompany(v => !v)}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaBuilding className="me-2" size={16} />
            회사정보 보기
          </h5>
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-light btn-sm me-2"
              onClick={(e) => {
                e.stopPropagation();
                handleStaffManagement();
              }}
            >
              <FaUsers className="me-1" /> 직원 관리
            </button>
            <span>{openCompany ? <FaChevronUp /> : <FaChevronDown />}</span>
          </div>
        </div>
      </div>
      {openCompany && (
        <div className="card-body p-4">
          <div className="row">
            {fields.map(([label, value], idx) => (
              <div key={idx} className={`col-md-${label === '기업 소개' || label === '등록일시' ? '12' : '6'} mb-3`}>
                <label className="form-label fw-bold text-muted">{label}</label>
                <p className="form-control-plaintext">{value || '-'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyInfoCard;
