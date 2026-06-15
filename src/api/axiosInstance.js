import axios from "axios";

// Create an instance matching your backend configuration
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/EduManager",
  headers: {
    "Content-Type": "application/json",
  },
});


//  Request Interceptor:
//  Runs before every request leaves the frontend. It reads the latest access token
//   straight from localStorage and appends it to the Authorization header.
 
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


//   Response Interceptor:
//   Monitors incoming responses. If a 401 error is received (Token Expired),
//   it halts the failed request, hits the refresh token endpoint, updates
//  localStorage, and retries the original request seamlessly.

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't already retried this request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const storedRefreshToken = localStorage.getItem("refreshToken");

        if (!storedRefreshToken) {
          // No refresh token available, force clean up and redirect
          localStorage.clear();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Call the refresh token endpoint using a clean axios instance to prevent loops
        const response = await axios.post(
          "http://localhost:8000/api/v1/EduManager/auth/refresh",
          { refreshToken: storedRefreshToken },
        );

        if (response.data?.success) {
          const { accessToken, refreshToken } = response.data.data;

          // Sync new tokens directly back into local storage
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // Update the authorization header of the original request and retry it
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // If the refresh token itself is expired or invalid, clear everything and kick to login
        console.error(
          "Refresh token execution flow failed:",
          refreshError.message,
        );
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
