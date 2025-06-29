import React from 'react';

const StaffEditModal = ({ visible, staff, form, setForm, onClose, onConfirm }) => {
  if (!visible || !staff) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">직원 정보 수정</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">이름</label>
              <input type="text" className="form-control" value={staff.nameKr} disabled />
            </div>
            <div className="mb-3">
              <label className="form-label">부서</label>
              <input
                type="text"
                className="form-control"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">직책</label>
              <input
                type="text"
                className="form-control"
                value={form.position}
                onChange={(e) => setForm({ ...form, position: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">역할 설명</label>
              <textarea
                className="form-control"
                rows="3"
                value={form.roleDesc}
                onChange={(e) => setForm({ ...form, roleDescription: e.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>취소</button>
            <button type="button" className="btn btn-primary" onClick={onConfirm}>수정</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffEditModal;
