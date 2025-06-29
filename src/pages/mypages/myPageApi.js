import { axiosInstance } from '../../api/axiosInstance';

// 유저 정보 가져오기
export const fetchMyPageUserInfo = async (userId) => {
  const res = await axiosInstance.get('/user-service/api/users/mypage-info', {
    headers: {
      'x-user-id': userId
    }
  });
  console.log("mypage user info", res.data);
  return res.data; // data 필드만 반환
};

// 유저 정보 수정
export const updateUserInfo = async (data, userId) => {
  const res = await axiosInstance.put('/user-service/api/users/mypage-info', data, {
    headers: {
      'x-user-id': userId
    }
  });
  console.log("mypage user info update", res.data);
  return res.data; // data 필드만 반환
};

// 회사 정보 가져오기
export const fetchMyPageCompanyInfo = async (companyId) => {
  const res = await axiosInstance.get(`/company-service/api/companies/${companyId}`);
  console.log("mypage company info", res.data);
  return res.data; // data 필드만 반환
};