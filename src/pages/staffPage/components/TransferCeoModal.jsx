import React from 'react';

const TransferCeoModal = ({ visible, staff, onClose, onConfirm }) => {
  if (!visible || !staff) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">CEO 권한 이전 확인</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>{staff.name}</strong> 직원에게 CEO 권한을 이전하시겠습니까?</p>
            <p className="text-warning">
              권한 이전 후 현재 계정은 일반 직원으로 변경되며,
              페이지가 새로고침됩니다.
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>
            <button type="button" className="btn btn-warning" onClick={onConfirm}>CEO 권한 이전</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferCeoModal;
