import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout Imports
import DashboardLayout from "./components/layout/DashboardLayout";

// Page Views Content Components Nodes
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import StudentCreation from "./pages/dashboard/StudentCreation";
import StudentList from "./pages/dashboard/StudentList";
import EditProfile from "./pages/profile/EditProfile";

function GuardedRouteBoundaryBlock({
  children,
  mandatoryClearanceRole,
  accessToken,
  user,
}) {
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }
  if (mandatoryClearanceRole && user.role !== mandatoryClearanceRole) {
    return <Navigate to="/dashboard/students" replace />;
  }
  return children;
}

export default function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const handleAuthInitializationSuccess = (authenticatedUser) => {
    setUser(authenticatedUser);
    setAccessToken(localStorage.getItem("accessToken"));
  };

  const handleApplicationThemeMatrixToggle = () => {
    const computedNextThemeNode = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", computedNextThemeNode);
    setTheme(computedNextThemeNode);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleCoreSystemSignoutClearance = () => {
    localStorage.clear();
    setUser(null);
    setAccessToken(null);
    window.location.href = "/login";
  };

  const handleUserNameClaimUpdateMutation = (updatedFieldsMap) => {
    const fullyMergedUserClaimNode = { ...user, ...updatedFieldsMap };
    localStorage.setItem("user", JSON.stringify(fullyMergedUserClaimNode));
    setUser(fullyMergedUserClaimNode);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            accessToken ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onAuthSuccess={handleAuthInitializationSuccess} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            accessToken ? <Navigate to="/dashboard" replace /> : <Signup />
          }
        />

        <Route
          path="/dashboard"
          element={
            <GuardedRouteBoundaryBlock accessToken={accessToken} user={user}>
              <DashboardLayout
                user={user}
                theme={theme}
                onToggleTheme={handleApplicationThemeMatrixToggle}
                onLogout={handleCoreSystemSignoutClearance}
                onUpdateUser={handleUserNameClaimUpdateMutation}
              />
            </GuardedRouteBoundaryBlock>
          }
        >
          <Route index element={<StudentCreation user={user} />} />
          <Route path="students" element={<StudentList user={user} />} />
          <Route path="profile" element={<EditProfile user={user} />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
