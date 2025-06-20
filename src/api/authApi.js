import axiosInstance from './axiosInstance';

export const login = async ({ loginId, loginPwd }) => {
  const response = await axiosInstance.post( '/user-service/api/auth/login', { 
    loginId, 
    loginPwd 
});
console.log(response);
const { success, message, data } = response.data;

if (!success) {
  throw new Error(message || '로그인 실패');
}

return data;
};