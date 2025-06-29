import { useEffect, useState, useRef } from 'react';
import { fetchMyPageUserInfo, updateUserInfo, fetchMyPageCompanyInfo } from '../myPageApi';

console.log('useMyPageForm 훅 실행');

export function useMyPageForm(user) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    companyNameKr: '',
    loginId: '',
    nameKr: '',
    nameEn: '',
    email: '',
    phoneNumber: '',
    department: '',
    position: '',
    roleDesc: '',
    createdAt: ''
  });

  const [openCompany, setOpenCompany] = useState({
    companyNameKr: '',
    companyNameEn: '',
    ceoNameKr: '',
    ceoNameEn: '',
    startDate: '',
    businessNumber: '',
    phoneNumber: '',
    faxNumber: '',
    postcode: '',
    address: '',
    addressDetail: '',
    businessType: '',
    description: '',
    createdAt: ''
  });

  const [selectedRole, setSelectedRole] = useState('supplier');
  const [openBasic, setOpenBasic] = useState(true);
  const [openMenu, setOpenMenu] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const usercalledRef = useRef(false); 
  const companyCalledRef = useRef(false);

  // 마이페이지 정보 로드 함수
  const loadUserInfo = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchMyPageUserInfo(user.userId);
      const data = response.data; 
      console.log('마이페이지 조회 결과:', response);
      
      setEditForm({
        companyNameKr: data.companyNameKr || '',
        loginId: data.loginId || '',
        nameKr: data.nameKr || '',
        nameEn: data.nameEn || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        department: data.department || '',
        position: data.position || '',
        roleDesc: data.roleDesc || '',
        createdAt: data.createdAt || ''
      });
    } catch (err) {
      console.error('마이페이지 사용자 정보 조회 실패:', err);
      setError(err.response?.data?.message || err.message || '사용자 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const loadCompanyInfo = async () => {
    if (!user?.companyId) return;
    try {
      const res = await fetchMyPageCompanyInfo(user.companyId);
      console.log('회사 정보 조회 결과:', res);

      let data = res?.data?.data ?? res?.data ?? res;
      if (typeof data === 'string') {
        setOpenCompany({}); 
        throw new Error(data);
      }
      if (!data || typeof data !== 'object') {
        setOpenCompany({}); 
        throw new Error('회사 정보가 유효하지 않습니다.');
      }

      setOpenCompany({
        companyNameKr: data.companyNameKr || '',
        companyNameEn: data.companyNameEn || '',
        ceoNameKr: data.ceoNameKr || '',
        ceoNameEn: data.ceoNameEn || '',
        startDate: data.startDate || '',
        businessNumber: data.businessNumber || '',
        phoneNumber: data.phoneNumber || '',
        faxNumber: data.faxNumber || '',
        postcode: data.postcode || '',
        address: data.address || '',
        addressDetail: data.addressDetail || '',
        businessType: data.businessType || '',
        createdAt: data.createdAt || ''
      });
    } catch (err) {
      console.error('회사 정보 조회 실패:', err);
      setError(err.response?.data?.message || err.message || '회사 정보를 불러오는데 실패했습니다.');
    }
  };

  // 마이페이지 회원 정보 API 호출
  useEffect(() => {
    if (user?.userId && !usercalledRef.current) {
      loadUserInfo();
      usercalledRef.current = true;
    }
  }, [user?.userId]);

  // 마이페이지 회사 정보 API 호출
  useEffect(() => {
    if (!user?.companyId) return;
  
    // 이미 이 companyId로 요청했다면 다시 안 함
    if (companyCalledRef.current === user.companyId) return;
  
    companyCalledRef.current = user.companyId;
    loadCompanyInfo();
  }, [user?.companyId]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      console.log('저장할 데이터:', editForm);
      
      const response = await updateUserInfo(editForm, user.userId);
      console.log('저장 성공:', response);
      alert('사용자 정보가 성공적으로 저장되었습니다.');
      setIsEditing(false);
    } catch (error) {
      console.error('사용자 정보 저장 실패:', error);
      alert(error.response?.data?.message || '저장 중 오류가 발생했습니다.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    setIsEditing(false);
    // 다시 조회해서 초기화
    await loadUserInfo();
  };

  return {
    isEditing, setIsEditing, editForm, setEditForm,
    selectedRole, setSelectedRole,
    openBasic, setOpenBasic,
    openCompany, setOpenCompany,
    openMenu, setOpenMenu,
    handleInputChange, handleSave, handleCancel,
    loading, error, saving
  };
}
