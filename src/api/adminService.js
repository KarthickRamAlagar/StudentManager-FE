import api from "./axiosInstance";

export const adminService = {
  // Admin only: Get total user account index registry lists values
  getAllUsers: async () => {
    const response = await api.get("/authAdmin/users");
    return response.data;
  },

  // Admin only: Fetch target identifier profile values map details
  getUserById: async (id) => {
    const response = await api.get(`/authAdmin/users/${id}`);
    return response.data;
  },

  // Admin only: Update clearance parameters roles between student vs teacher fields
  updateUserRole: async (id, role) => {
    const response = await api.patch(`/authAdmin/users/${id}/role`, { role });
    return response.data;
  },

  // Admin only: Adjust target runtime access state block operations parameters
  updateUserStatus: async (id, status) => {
    const response = await api.patch(`/authAdmin/users/${id}/status`, {
      status,
    });
    return response.data;
  },
};
