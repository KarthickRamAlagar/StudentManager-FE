import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthActions } from "../../hooks/useAuthActions";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent } from "../../components/ui/card";
import { Loader2 } from "lucide-react";

export default function Login({ onAuthSuccess }) {
  const { login, loading, error: authError } = useAuthActions();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");
    try {
      const user = await login(email, password);
      onAuthSuccess(user);
      navigate("/dashboard");
    } catch (err) {
      setLocalError(err.message || "Invalid authentication properties.");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100 dark:bg-zinc-950 p-4">
      <Card className="w-full max-w-4xl overflow-hidden shadow-xl border-none">
        <CardContent className="p-0 flex flex-col md:flex-row h-[500px]">
          {/* Left Split Panel: Aesthetic Hero Area */}
          <div className="hidden md:flex md:w-1/2 bg-blue-600 items-center justify-center p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
            <div className="relative z-10 space-y-4 max-w-xs text-center">
              <h2 className="text-3xl font-bold tracking-tight">EduManager</h2>
              <p className="text-sm opacity-80">
                Access and coordinate enterprise academic parameters across
                distributed layout directories.
              </p>
            </div>
          </div>

          {/* Right Split Panel: Active Login Input Form */}
          <div className="w-full md:w-1/2 bg-white dark:bg-zinc-900 p-8 flex flex-col justify-center text-zinc-900 dark:text-zinc-50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <h1 className="text-2xl font-bold tracking-tight">
                  System Login
                </h1>
                <p className="text-sm text-zinc-500">
                  Provide verified account parameters to authenticate.
                </p>
              </div>

              {(localError || authError) && (
                <div className="p-3 text-xs bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 rounded-md font-medium">
                  {localError || authError}
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="karthikeyan@edumanager.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Security Passphrase</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full font-semibold bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Matching
                    Keys...
                  </>
                ) : (
                  "Sign In to Hub"
                )}
              </Button>

              <div className="text-center text-sm text-zinc-500 mt-2">
                Don't have an identity account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
