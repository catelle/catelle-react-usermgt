import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`, // Use backticks for template literals
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Use backticks for template literals
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;

      if (response && response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
      }
    } catch (er) {
      console.log(er);
    }

    throw error;
  }
);

export default axiosClient;
