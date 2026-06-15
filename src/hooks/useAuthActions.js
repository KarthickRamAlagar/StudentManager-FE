import { useState } from "react";
import { authService } from "../api/authService";

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
//  Executes login sequence against the backend.
//  Stores the returned user and tokens directly inside browser local storage.
   
  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const result = await authService.login(email, password);
      if (result?.success && result?.data) {
        const { accessToken, refreshToken, user } = result.data;

        // Save matching data parameters directly into standard storage slots
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return user;
      }
      throw new Error(
        result?.message ||
          "Authentication returned an invalid data payload layout.",
      );
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Login processing execution failure.";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Provisions a user profile node registration matrix inside the DB cluster.
   
  const handleSignup = async (name, email, password, role) => {
    setLoading(true);
    setError("");
    try {
      const result = await authService.signup(name, email, password, role);
      return result;
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.message ||
        "Account provisioning failure loop.";
      setError(errMsg);
      throw new Error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // Clears out active tokens, drops backend sessions arrays, and purges browser storage variables.

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.warn(
        "Backend token invalidation processing timed out or failed:",
        err.message,
      );
    } finally {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  return {
    loading,
    error,
    login: handleLogin,
    signup: handleSignup,
    logout: handleLogout,
  };
}
