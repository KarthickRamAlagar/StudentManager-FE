import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, User, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Header({ user, theme, onToggleTheme, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b bg-white dark:bg-zinc-950 px-6 shadow-sm">
      <Link
        to="/dashboard"
        className="text-xl font-bold tracking-tight text-blue-600 dark:text-blue-500"
      >
        EduManager
      </Link>

      <div className="flex items-center gap-4">
        {/* Theme Toggler Button via passed prop hooks trigger actions */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          aria-label="Toggle structural visual theme matrix"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-zinc-600" />
          ) : (
            <Sun className="h-5 w-5 text-amber-400" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100">
                  {user?.name || "User Node"}
                </p>
                <p className="text-xs leading-none text-zinc-500">
                  {user?.email}
                </p>
                <span className="mt-1 w-max rounded bg-blue-100 dark:bg-blue-900/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-blue-600 dark:text-blue-400">
                  {user?.role}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/dashboard/profile")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" /> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive cursor-pointer"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
