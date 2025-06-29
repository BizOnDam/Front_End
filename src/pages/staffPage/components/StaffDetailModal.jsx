import React from 'react';
import { formatDateToYYYYMMDD } from '../../../utils/dateUtils';

const StaffDetailModal = ({ visible, staff, onClose }) => {
  if (!visible || !staff) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">직원 상세 정보</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <p><strong>이름:</strong> {staff.nameKr}</p>
                <p><strong>이메일:</strong> {staff.email}</p>
                <p><strong>전화번호:</strong> {staff.phoneNumber || '-'}</p>
                <p><strong>역할:</strong> {staff.roleInCompany}</p>
              </div>
              <div className="col-md-6">
                <p><strong>부서:</strong> {staff.department || '-'}</p>
                <p><strong>직책:</strong> {staff.position || '-'}</p>
                <p><strong>역할 설명:</strong> {staff.roleDesc || '-'}</p>
                <p><strong>가입일:</strong> {formatDateToYYYYMMDD(staff.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailModal;
