import { useState, useCallback } from "react";
import axios from "axios";

export function useStudentData() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. GET ALL STUDENTS: GET /api/v1/EduManager/students/get-all
  const fetchAllStudents = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const {
        page = 1,
        search = "",
        department = "all",
        year = "all",
      } = filters;

      // Build parameters list matching your search filters specs
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: "10",
      });
      if (search) queryParams.append("search", search);
      if (department !== "all") queryParams.append("department", department);
      if (year !== "all") queryParams.append("year", year);

      const response = await axios.get(
        `http://localhost:8000/api/v1/EduManager/students/get-all?${queryParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const resolvedData = response.data?.data || response.data || [];
      setStudents(resolvedData);
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to load students cluster matrix.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. GET STUDENT BY ID: GET /api/v1/EduManager/students/get-by-id/{id}
  const fetchStudentById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        `http://localhost:8000/api/v1/EduManager/students/get-by-id/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Error fetching individual student profile node.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // 3. CREATE NEW STUDENT: POST /api/v1/EduManager/students/create
  const createStudent = useCallback(async (multipartFormData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "http://localhost:8000/api/v1/EduManager/students/create",
        multipartFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", 
          },
        },
      );
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Schema constraint serialization failure.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // 4. UPDATE EXISTING STUDENT: PUT /api/v1/EduManager/students/{id}
  const updateStudent = useCallback(async (id, payloadData) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.put(
        `http://localhost:8000/api/v1/EduManager/students/${id}`,
        payloadData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Failed to commit cluster node modification edits.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  // 5. DELETE STUDENT RECORD: DELETE /api/v1/EduManager/students/delete/{id}
  const deleteStudent = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.delete(
        `http://localhost:8000/api/v1/EduManager/students/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Error running deletion clearance script routine.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    students,
    loading,
    error,
    fetchAllStudents,
    fetchStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
  };
}
