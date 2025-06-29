import { axiosInstance } from '../../api/axiosInstance';

// export const getStaffList = (companyId) =>
//   axiosInstance.get(`/company-service/api/companies/staff/list?companyId=${companyId}`).then(res => res.data);

// export const getStaffDetail = (targetUserId, companyId) =>
//   axiosInstance.get(`/company-service/api/companies/staff-info/${targetUserId}?companyId=${companyId}`).then(res => res.data);

// export const deleteStaff = (targetUserId, companyId) =>
//   axiosInstance.patch(`/company-service/api/companies/staff/delete/${targetUserId}?companyId=${companyId}`).then(res => res.data);

// export const updateStaff = (targetUserId, companyId, updateData) =>
//   axiosInstance.patch(`/company-service/api/companies/staff/update/${targetUserId}?companyId=${companyId}`, updateData).then(res => res.data);

// export const transferCeoRole = (targetUserId, companyId) =>
//   axiosInstance.patch(`/company-service/api/companies/staff/transfer-ceo/${targetUserId}?companyId=${companyId}`).then(res => res.data);

// 직원 목록 조회
export const getStaffList = async (companyId, userId, userRole) => {
  try {
    const res = await axiosInstance.get(`/company-service/api/companies/staff/list?companyId=${companyId}`, {
      headers: {
        'X-User-Id': userId,
        'X-User-Role': userRole
      }
    });
    return res.data;
  } catch (error) {
    console.error('직원 목록 조회 실패:', error);
    throw error;
  }
};

// 직원 상세 정보 조회
export const getStaffDetail = async (targetUserId, companyId, userId, userRole) => {
  try {
    const res = await axiosInstance.get(`/company-service/api/companies/staff-info/${targetUserId}?companyId=${companyId}`, {
      headers: {
        'X-User-Id': userId,
        'X-User-Role': userRole
      }
    });
    return res.data;
  } catch (error) {
    console.error(`직원 상세 정보 조회 실패 (userId=${targetUserId}):`, error);
    throw error;
  }
};

// 직원 삭제 (퇴사 처리)
export const deleteStaff = async (targetUserId, companyId, userId, userRole) => {
  try {
    const res = await axiosInstance.patch(`/company-service/api/companies/staff/delete/${targetUserId}?companyId=${companyId}`, null, {
      headers: {
        'X-User-Id': userId,
        'X-User-Role': userRole
      }
    });
    return res.data;
  } catch (error) {
    console.error(`직원 삭제 실패 (userId=${targetUserId}):`, error);
    throw error;
  }
};

// 직원 정보 수정
export const updateStaff = async (targetUserId, companyId, updateData, userId, userRole) => {
  try {
    const res = await axiosInstance.patch(`/company-service/api/companies/staff/update/${targetUserId}?companyId=${companyId}`, updateData, {
      headers: {
        'X-User-Id': userId,
        'X-User-Role': userRole
      }
    });
    return res.data;
  } catch (error) {
    console.error(`직원 정보 수정 실패 (userId=${targetUserId}):`, error);
    throw error;
  }
};

// 대표 권한 이관
export const transferCeoRole = async (targetUserId, companyId, userId, userRole) => {
  try {
    const res = await axiosInstance.patch(`/company-service/api/companies/staff/transfer-ceo/${targetUserId}?companyId=${companyId}`, null, {
      headers: {
        'X-User-Id': userId,
        'X-User-Role': userRole
      }
    });
    return res.data;
  } catch (error) {
    console.error(`대표 권한 이관 실패 (userId=${targetUserId}):`, error);
    throw error;
  }
};