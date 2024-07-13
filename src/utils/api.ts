
import axios from 'axios';

// Create an Axios instance
export const axiosInstance = axios.create();

// Add a request interceptor to include the Authorization header
// axiosInstance.interceptors.request.use(
//     (config) => {
//       const authorization_token = localStorage.getItem('authorization_token');
//       if (authorization_token && config.headers) {
//         config.headers['Authorization'] = `Basic ${authorization_token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );


  // Add a response interceptor to handle 401 and 403 status codes
axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized. Please check your credentials and try again.');
        } else if (error.response.status === 403) {
          alert('Forbidden. You do not have permission to perform this action.');
        } else {
          alert(`An error occurred: ${JSON.stringify(error?.response?.data)}`);
        }
      } else {
        alert('An error occurred while making the request. Please try again.');
      }
      return Promise.reject(error);
    }
  );