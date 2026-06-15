import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStudentData } from "../../hooks/useStudentData";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import FileUploader from "../../components/shared/FileUploader";
import StudentCardView from "../profile/StudentCardView";
import { Loader2 } from "lucide-react";

export default function StudentCreation({ user: directUser }) {
  const outletContext = useOutletContext() || {};
  const user = directUser || outletContext.user;

  const isTeacher = user?.role === "teacher";
  if (!isTeacher) {
    return <StudentCardView user={user} />;
  }

  const { createStudent, loading, error: apiError } = useStudentData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: "1",
    phone: "",
    address: "",
  });
  const [profileFile, setProfileFile] = useState(null);
  const [status, setStatus] = useState({
    type: "",
    msg: "",
    credentials: null,
  });

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "", credentials: null });

    const payloadMultipartForm = new FormData();
    Object.keys(formData).forEach((key) =>
      payloadMultipartForm.append(key, formData[key]),
    );
    if (profileFile) payloadMultipartForm.append("profileImage", profileFile);

    try {
      const result = await createStudent(payloadMultipartForm);
      setStatus({
        type: "success",
        msg: "Student data node and login context generated cleanly inside the database clusters.",
        credentials: result.data?.loginCredentials,
      });
      setFormData({
        name: "",
        email: "",
        studentId: "",
        department: "",
        year: "1",
        phone: "",
        address: "",
      });
      setProfileFile(null);
    } catch (err) {
      setStatus({
        type: "error",
        msg: err.message || "Schema compilation error.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-md border-none bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        <CardHeader>
          <CardTitle>Enroll New Student Profile</CardTitle>
          <CardDescription>
            Generates matching system directory data links alongside dynamic
            login parameters arrays loops.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(status.msg || apiError) && (
            <div
              className={`p-4 mb-4 text-sm rounded-lg ${status.type === "success" ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400" : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"}`}
            >
              {status.msg || apiError}
              {status.credentials && (
                <div className="mt-3 p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-800 text-xs font-mono space-y-1 text-zinc-800 dark:text-zinc-200">
                  <div>
                    <strong>Generated Access Email:</strong>{" "}
                    {status.credentials.email}
                  </div>
                  <div>
                    <strong>Temporary Sign-in Key:</strong>{" "}
                    {status.credentials.password}
                  </div>
                </div>
              )}
            </div>
          )}

          <form
            onSubmit={handleEnrollmentSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-1">
              <Label htmlFor="s-name">Student Full Name</Label>
              <Input
                id="s-name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-email">Target Email Address</Label>
              <Input
                id="s-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-id">Matriculation Register ID</Label>
              <Input
                id="s-id"
                required
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-dept">Academic Department Group</Label>
              <Input
                id="s-dept"
                required
                placeholder="Computer Science"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-year">Academic Batch Class Year</Label>
              <Select
                value={formData.year}
                onValueChange={(v) => setFormData({ ...formData, year: v })}
              >
                <SelectTrigger id="s-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-zinc-800 border">
                  {["1", "2", "3", "4"].map((yr) => (
                    <SelectItem key={yr} value={yr}>
                      Year {yr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="s-phone">Contact Phone String</Label>
              <Input
                id="s-phone"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
              <div className="space-y-1 flex flex-col justify-end">
                <Label className="mb-2">Profile Image Avatar Attachment</Label>
                <FileUploader
                  selectedFile={profileFile}
                  onFileChange={(file) => setProfileFile(file)}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="s-address">
                  Residential Location Address Mapping
                </Label>
                <Input
                  id="s-address"
                  required
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full md:col-span-2 font-semibold mt-4 bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Provisioning
                  Storage Directory Records...
                </>
              ) : (
                "Execute Profile Infrastructure Binding"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
