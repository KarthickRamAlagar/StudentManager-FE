import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({
  user,
  theme,
  onToggleTheme,
  onLogout,
  onUpdateUser,
}) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-slate-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
      {/* Header receives parameters and drilling props links directly */}
      <Header
        user={user}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onLogout={onLogout}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} onLogout={onLogout} />

        <main className="flex-1 overflow-y-auto p-8">
          {/* 
            Since we lack Context, we pass data dynamically into child views 
            by leveraging React Router's native context injection bridge on Outlet.
          */}
          <Outlet context={{ user, onUpdateUser }} />
        </main>
      </div>
    </div>
  );
}
