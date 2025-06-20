import axiosInstance from './axiosInstance';

export const login = async ({ loginId, loginPwd }) => {
  const response = await axiosInstance.post( 'http://localhost:8081/api/auth/login', { 
    loginId, 
    loginPwd 
});

console.log(response);

return response.data; // { success, code, message, data }
};