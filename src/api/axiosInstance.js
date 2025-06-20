import axios from 'axios';


console.log('LOCAL URL:', import.meta.env.VITE_API_LOCAL_URL);
console.log('SERVER URL:', import.meta.env.VITE_API_SERVER_URL);

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_LOCAL_URL, // Gateway 주소
  withCredentials: true,
});

export default axiosInstance;