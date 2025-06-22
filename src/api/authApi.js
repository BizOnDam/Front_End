import axiosInstance from './axiosInstance';

export const login = async ({ loginId, loginPwd }) => {
  const response = await axiosInstance.post( '/user-service/api/auth/login', { 
    loginId, 
    loginPwd 
});

console.log(response);

return response.data; // { success, code, message, data }
};