import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuthActions";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const { signup, loading, error: authError } = useAuthActions();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [localError, setLocalError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    setSuccessMsg("");
    try {
      await signup(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
      );
      setSuccessMsg(
        "Identity configured successfully! Redirecting to auth entry node...",
      );
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setLocalError(err.message || "Registration parameter mismatch error.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl border-none">
        <CardContent className="p-0 flex flex-col md:flex-row h-[550px]">
          {/* Left Panel: Branding Space */}
          <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
            <div className="relative z-10 space-y-4 max-w-xs text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Provision Identity
              </h2>
              <p className="text-sm opacity-80">
                Hook onto the central system architecture directly with
                structural access roles mapping fields.
              </p>
            </div>
          </div>

          {/* Right Panel: Content Form Fields */}
          <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center text-zinc-900 dark:text-zinc-50">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  System Registry
                </h1>
                <p className="text-sm text-zinc-500">
                  Provide accurate credentials setup values.
                </p>
              </div>

              {(localError || authError) && (
                <div className="p-2.5 text-xs bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 rounded-md">
                  {localError || authError}
                </div>
              )}
              {successMsg && (
                <div className="p-2.5 text-xs bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400 rounded-md">
                  {successMsg}
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="name">Full Identity Name</Label>
                <Input
                  id="name"
                  required
                  placeholder="Karthikeyan R"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Routing Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Security Password String</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Min 6 values"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="role">Functional Clearance Level</Label>
                <Select
                  value={formData.role}
                  onValueChange={(v) => setFormData({ ...formData, role: v })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Assign account role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-zinc-800 border">
                    <SelectItem value="student">
                      Student Profile Scope
                    </SelectItem>
                    <SelectItem value="teacher">
                      Faculty Teacher Portal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Provisioning Node...
                  </>
                ) : (
                  "Finalize System Enrollment"
                )}
              </Button>
              <div className="text-center text-sm text-zinc-500 mt-1">
                Registered on network?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
