import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  getStaffList,
  getStaffDetail,
  deleteStaff,
  updateStaff,
  transferCeoRole
} from './staffApi';
import LoadingOrError from '../../components/LoadingOrError';
import StaffTable from './components/StaffTable';
import StaffDetailModal from './components/StaffDetailModal';
import StaffEditModal from './components/StaffEditModal';
import StaffDeleteModal from './components/StaffDeleteModal';
import TransferCeoModal from './components/TransferCeoModal';

const StaffPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [modals, setModals] = useState({
    detail: false,
    edit: false,
    delete: false,
    transfer: false,
  });

  const [editForm, setEditForm] = useState({
    department: '',
    position: '',
    roleDescription: '',
  });

  // CEO 권한 확인
  useEffect(() => {
    if (user && user.roleInCompany !== 'CEO') {
      alert('CEO 권한이 필요한 페이지입니다.');
      navigate('/');
    }
  }, [user, navigate]);

  const fetchStaffList = async () => {
    try {
      setLoading(true);
      const response = await getStaffList(user?.companyId, user.userId, user.roleInCompany);
      if (response.success) {
        setStaffList(response.data);
      } else {
        setError('직원 목록을 불러올 수 없습니다.');
      }
    } catch (err) {
      setError('직원 목록 조회 중 오류가 발생했습니다.', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffDetail = async (userId) => {
    try {
      const response = await getStaffDetail(userId, user?.companyId, user.userId, user.roleInCompany);
      if (response.success) {
        setSelectedStaff(response.data);
        setModals(prev => ({ ...prev, detail: true }));
      } 
    //   else {
    //     alert('직원 정보를 불러올 수 없습니다.');
    //   }
    } catch (err) {
      alert('직원 정보 조회 중 오류가 발생했습니다.', err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteStaff(selectedStaff.userId, user?.companyId, user.userId, user.roleInCompany);
      if (response.success) {
        alert('직원이 삭제되었습니다.');
        setModals(prev => ({ ...prev, delete: false }));
        fetchStaffList();
      } else alert('직원 삭제 실패');
    } catch {
      alert('직원 삭제 중 오류 발생');
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await updateStaff(selectedStaff.userId, user?.companyId, editForm, user.userId, user.roleInCompany);
      if (response.success) {
        alert('수정되었습니다.');
        setModals(prev => ({ ...prev, edit: false }));
        fetchStaffList();
      } else alert('수정 실패');
    } catch {
      alert('직원 수정 중 오류 발생');
    }
  };

  const handleTransfer = async () => {
    try {
      const response = await transferCeoRole(selectedStaff.userId, user?.companyId, user.userId, user.roleInCompany);
      if (response.success) {
        alert('CEO 권한 이전 완료');
        window.location.reload();
      } else alert('이전 실패');
    } catch {
      alert('CEO 권한 이전 중 오류 발생');
    }
  };

  const openEdit = (staff) => {
    setSelectedStaff(staff);
    setEditForm({
      department: staff.department || '',
      position: staff.position || '',
      roleDescription: staff.roleDescription || '',
    });
    setModals(prev => ({ ...prev, edit: true }));
  };

  const openDelete = (staff) => {
    setSelectedStaff(staff);
    setModals(prev => ({ ...prev, delete: true }));
  };

  const openTransfer = (staff) => {
    setSelectedStaff(staff);
    setModals(prev => ({ ...prev, transfer: true }));
  };

  useEffect(() => {
    if (user?.companyId && user?.roleInCompany === 'CEO') {
      fetchStaffList();
    }
  }, [user?.companyId, user?.roleInCompany]);

  if (!user || user.roleInCompany !== 'CEO') {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">CEO 권한이 필요한 페이지입니다.</div>
      </div>
    );
  }

  if (loading) return <LoadingOrError loading />;
  if (error) return <LoadingOrError error={error} />;

  return (
    <div className="container-fluid py-4">
      <h4>직원 관리</h4>
      <p className="text-muted">회사 직원 정보를 관리할 수 있습니다.</p>

      <StaffTable
        staffList={staffList}
        onDetail={fetchStaffDetail}
        onEdit={openEdit}
        onDelete={openDelete}
        onTransfer={openTransfer}
        currentUserRole={user?.roleInCompany}
      />

      <StaffDetailModal
        visible={modals.detail}
        staff={selectedStaff}
        onClose={() => setModals(prev => ({ ...prev, detail: false }))}
      />

      <StaffEditModal
        visible={modals.edit}
        staff={selectedStaff}
        form={editForm}
        setForm={setEditForm}
        onClose={() => setModals(prev => ({ ...prev, edit: false }))}
        onConfirm={handleUpdate}
      />

      <StaffDeleteModal
        visible={modals.delete}
        staff={selectedStaff}
        onClose={() => setModals(prev => ({ ...prev, delete: false }))}
        onConfirm={handleDelete}
      />

      <TransferCeoModal
        visible={modals.transfer}
        staff={selectedStaff}
        onClose={() => setModals(prev => ({ ...prev, transfer: false }))}
        onConfirm={handleTransfer}
      />
    </div>
  );
};

export default StaffPage;
