import React from "react";
import { NavLink } from "react-router-dom";
import { PlusCircle, List, LogOut, UserCheck } from "lucide-react";
import { cn } from "../../lib/utils";

export default function Sidebar({ user, onLogout }) {
  const isTeacher = user?.role === "teacher";

  // Build the array based on permission clearance roles blocks dynamically
  const links = [
    ...(isTeacher
      ? [{ to: "/dashboard", label: "Create Student", icon: PlusCircle }]
      : [{ to: "/dashboard", label: "My Profile View", icon: UserCheck }]),

    // Only inject the Class List route row element if the logged-in profile is a teacher
    ...(isTeacher
      ? [
          {
            to: "/dashboard/students",
            label: "Student List",
            icon: List,
          },
        ]
      : []),
  ];

  return (
    <aside className="flex h-[calc(100vh-4rem)] w-64 flex-col justify-between border-r bg-white dark:bg-zinc-950 p-4 shadow-sm">
      <nav className="space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-900",
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-600 dark:bg-blue-500"
                    : "text-zinc-600 dark:text-zinc-400",
                )
              }
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          );
        })}
      </nav>

      <button
        onClick={onLogout}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
      >
        <LogOut className="h-5 w-5" />
        Logout
      </button>
    </aside>
  );
}
