import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { authService } from "../../api/authService";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { KeyRound, Loader2 } from "lucide-react";

export default function EditProfile() {
  const { user } = useOutletContext();
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [mutationLoading, setMutationLoading] = useState(false);

  const handlePasswordResetChange = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return setStatus({
        type: "error",
        msg: "Cryptographic confirmation tokens matching constraint verification mismatch.",
      });
    }

    setMutationLoading(true);
    try {
      await authService.resetPassword(user.email, passwordForm.newPassword);
      setStatus({
        type: "success",
        msg: "Cryptographic system sign-in verification keys updated successfully.",
      });
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      setStatus({
        type: "error",
        msg:
          err.response?.data?.message ||
          "Execution engine exception loop error.",
      });
    } finally {
      setMutationLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 text-zinc-900 dark:text-zinc-50">
      <Card className="shadow-md border-none bg-white dark:bg-zinc-950">
        <CardHeader>
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-500 font-bold">
            <KeyRound className="h-5 w-5" /> Identity Metadata Claims
          </div>
          <CardDescription>
            Core structural authorization values parameters profile matching
            parameters configuration grids.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="grid grid-cols-3 border-b border-zinc-100 dark:border-zinc-800/70 py-2">
            <span className="text-zinc-400">Account Username:</span>
            <span className="col-span-2 font-semibold text-zinc-800 dark:text-zinc-200">
              {user?.name}
            </span>
          </div>
          <div className="grid grid-cols-3 border-b border-zinc-100 dark:border-zinc-800/70 py-2">
            <span className="text-zinc-400">Account Target Email:</span>
            <span className="col-span-2 font-semibold text-zinc-800 dark:text-zinc-200">
              {user?.email}
            </span>
          </div>
          <div className="grid grid-cols-3 py-2">
            <span className="text-zinc-400">Clearance Access Group:</span>
            <span className="col-span-2 font-mono text-xs uppercase font-bold text-blue-600 dark:text-blue-400">
              {user?.role}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-md border-none bg-white dark:bg-zinc-950">
        <CardHeader>
          <CardTitle>Overwrite Security Passphrase Access Key</CardTitle>
          <CardDescription>
            Overwrites local credentials maps and clears operational caching
            structures layers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status.msg && (
            <div
              className={`p-3 mb-4 text-xs rounded-md ${status.type === "success" ? "bg-green-50 text-green-600 dark:bg-green-950/20 dark:text-green-400" : "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"}`}
            >
              {status.msg}
            </div>
          )}
          <form onSubmit={handlePasswordResetChange} className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="pass-new">New Passphrase Value String</Label>
              <Input
                id="pass-new"
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.newPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: e.target.value,
                  })
                }
                className="bg-white dark:bg-zinc-900 border"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="pass-confirm">
                Verify Passphrase String Sequence
              </Label>
              <Input
                id="pass-confirm"
                type="password"
                required
                placeholder="••••••••"
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: e.target.value,
                  })
                }
                className="bg-white dark:bg-zinc-900 border"
              />
            </div>
            <Button
              type="submit"
              className="w-full font-semibold bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={mutationLoading}
            >
              {mutationLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Recording
                  change values...
                </>
              ) : (
                "Commit Secure Key Refactor"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
