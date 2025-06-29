import React from 'react';
import { FaBolt, FaChevronUp, FaChevronDown, FaFileAlt, FaHandshake, FaHistory, FaChartLine } from 'react-icons/fa';

function QuickMenuCard({ selectedRole, setSelectedRole, handleMenuClick, openMenu, setOpenMenu }) {
  return (
    <div className="card shadow-sm border-0 rounded-4">
      <div className="card-header bg-light rounded-top-4" style={{cursor:'pointer'}} onClick={() => setOpenMenu(v => !v)}>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaBolt className="me-2" size={16} />
            빠른 메뉴
          </h5>
          <span>{openMenu ? <FaChevronUp /> : <FaChevronDown />}</span>
        </div>
      </div>
      {openMenu && (
        <div className="card-body p-4">
          <div className="mb-4 d-flex justify-content-center gap-3">
            {['supplier', 'buyer'].map(role => (
              <button
                key={role}
                className={`btn btn${selectedRole === role ? '' : '-outline'}-secondary px-4 fw-bold`}
                onClick={() => setSelectedRole(role)}
              >
                {role === 'supplier' ? '공급업체' : '수요업체'}
              </button>
            ))}
          </div>
          <div className="row g-3">
            {[
              { label: '견적 관리', icon: <FaFileAlt />, path: '/estimateList', color: 'primary' },
              { label: '계약 관리', icon: <FaHandshake />, path: '/contracts', color: 'success' },
              { label: '거래 이력', icon: <FaHistory />, path: '/history', color: 'info' },
              { label: '대시보드', icon: <FaChartLine />, path: '/dashboard', color: 'warning' }
            ].map(({ label, icon, path, color }, idx) => (
              <div key={idx} className="col-md-6">
                <button onClick={() => handleMenuClick(path)} className={`btn btn-outline-${color} w-100 p-3 rounded-3`}>
                  {icon} <span className="ms-2">{label}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickMenuCard;
