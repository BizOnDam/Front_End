import React from 'react';

const StaffDeleteModal = ({ visible, staff, onClose, onConfirm }) => {
  if (!visible || !staff) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">직원 삭제 확인</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>정말로 <strong>{staff.nameKr}</strong> 직원을 삭제하시겠습니까?</p>
            <p className="text-danger">이 작업은 되돌릴 수 없습니다.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDeleteModal;
