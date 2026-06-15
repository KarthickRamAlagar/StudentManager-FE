import api from "./axiosInstance";

export const authService = {

  // Public route: Account registration
  signup: async (name, email, password, role = "student") => {
    const response = await api.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    return response.data;
  },

  // Public route: User sign in
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data; 
  },

  // Protected route: Invalidate current token session in DB & Redis cache
  logout: async () => {
    const response = await api.post("/auth/logout", {});
    return response.data;
  },

  // Protected route: Fetch current profile metadata values from DB
  getProfile: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  // Public route: Initialize password recovery process link routing triggers
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },

  // Public route: Submit and overwrite password string
  resetPassword: async (email, newPassword) => {
    const response = await api.post("/auth/reset-password", {
      email,
      newPassword,
    });
    return response.data;
  },
};
