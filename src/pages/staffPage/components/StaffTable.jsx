import React from 'react';
import { formatDateToYYYYMMDD } from '../../../utils/dateUtils';

const StaffTable = ({ staffList, onDetail, onEdit, onDelete, onTransfer, currentUserRole }) => {
  return (
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          <th>이름</th>
          <th>이메일</th>
          <th>부서</th>
          <th>직책</th>
          <th>역할</th>
          <th>가입일</th>
          <th>관리</th>
        </tr>
      </thead>
      <tbody>
        {staffList.map((staff) => (
          <tr key={staff.userId}>
            <td>
              <strong>{staff.name}</strong>
              {staff.roleInCompany === 'CEO' && (
                <span className="badge bg-primary ms-2">CEO</span>
              )}
            </td>
            <td>{staff.email}</td>
            <td>{staff.department || '-'}</td>
            <td>{staff.position || '-'}</td>
            <td>{staff.roleInCompany}</td>
            <td>{formatDateToYYYYMMDD(staff.createdAt)}</td>
            <td>
              <div className="btn-group" role="group">
                <button className="btn btn-sm btn-outline-primary" onClick={() => onDetail(staff.userId)}>
                  상세보기
                </button>
                {staff.roleInCompany !== 'CEO' && (
                  <>
                    <button className="btn btn-sm btn-outline-warning" onClick={() => onEdit(staff)}>
                      수정
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(staff)}>
                      삭제
                    </button>
                    {currentUserRole === 'CEO' && (
                      <button className="btn btn-sm btn-outline-success" onClick={() => onTransfer(staff)}>
                        CEO 지정
                      </button>
                    )}
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StaffTable;
