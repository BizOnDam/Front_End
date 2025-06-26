import { axiosInstance, axiosSignInstance} from './axiosInstance';

export const login = async ({ loginId, loginPwd }) => {
  const response = await axiosSignInstance.post('/user-service/api/auth/login', { 
    loginId, 
    loginPwd 
});

console.log("authAPI.js response", response);

return response.data;
};


export async function logout(userId, refreshToken) {
  try {
    const response = await axiosInstance.post('/user-service/api/auth/logout', {
      userId,
      refreshToken
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
}