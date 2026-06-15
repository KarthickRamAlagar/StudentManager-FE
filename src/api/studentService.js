import api from "./axiosInstance";

export const studentService = {
  // Create Student (Teacher Only)

  createStudent: async (studentFormData) => {
    const response = await api.post("/students/create", studentFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Get All Students (Teacher Only)

  getAllStudents: async (queryParams) => {
    const response = await api.get("/students/get-all", {
      params: queryParams,
    });
    return response.data;
  },

  // Get Student By ID (Accessible by both Teachers and Students)
  getStudentById: async (id) => {
    const response = await api.get(`/students/get-by-id/${id}`);
    return response.data;
  },

  //    Update Student profile fields dynamically via modal dialog bindings.
  updateStudent: async (id, updateData) => {
    const response = await api.put(`/students/${id}`, updateData);
    return response.data;
  },

  // Delete Student Record (Teacher Only)
  deleteStudent: async (id) => {
    const response = await api.delete(`/students/delete/${id}`);
    return response.data;
  },
};
