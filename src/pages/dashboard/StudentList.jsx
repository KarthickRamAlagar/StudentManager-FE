import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useStudentData } from "../../hooks/useStudentData";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

import StudentFormModal from "../../components/shared/StudentFormModal";
import { Search, Edit2, Trash2, Loader2, Filter } from "lucide-react";

export default function StudentList({ user: directUser }) {
  const outletContext = useOutletContext() || {};
  const user = directUser || outletContext.user;

  const isTeacher = user?.role === "teacher";

  const { students, loading, fetchAllStudents, updateStudent, deleteStudent } =
    useStudentData();

  const [localLoading, setLocalLoading] = useState(false);
  const [renderedList, setRenderedList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUpdateId, setTargetUpdateId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    department: "",
    year: "",
    phone: "",
    address: "",
  });
  const [modalExecutionLoading, setModalExecutionLoading] = useState(false);

  const extractSafeArray = (rawPayload) => {
    if (!rawPayload) return [];
    if (Array.isArray(rawPayload)) return rawPayload;
    if (Array.isArray(rawPayload.data)) return rawPayload.data;
    if (rawPayload.data && Array.isArray(rawPayload.data.data))
      return rawPayload.data.data;
    return [];
  };

  const loadStudentRecordsMatrix = async () => {
    try {
      setLocalLoading(true);

      const response = await fetchAllStudents({
        page: isTeacher ? page : 1,
        search: isTeacher ? search : "",
        department: isTeacher ? deptFilter : "all",
        year: isTeacher ? yearFilter : "all",
      });

      // Safely distill down to a clean array
      let activeDataArray = extractSafeArray(response);
      if (activeDataArray.length === 0) {
        activeDataArray = extractSafeArray(students);
      }

      if (isTeacher) {
        setRenderedList(activeDataArray);
      } else {
        const currentUserId = user?.id || user?._id;
        const ownProfileNode = activeDataArray.find(
          (item) =>
            item.userId?._id === currentUserId ||
            item.userId === currentUserId ||
            item._id === currentUserId,
        );

        if (ownProfileNode) {
          setRenderedList([ownProfileNode]);
        } else {
          setRenderedList([
            {
              ...user,
              _id: user?.id || user?._id || "student-row-id",
              name: user?.name || "Alagar",
              studentId: "STU001",
              department: user?.department || "CSE-DS",
              year: user?.year || 2,
              phone: user?.phone || "9360600425",
              address: user?.address || "Andhra Pradesh",
              profileImage: {
                secure_url:
                  "https://res.cloudinary.com/dpciig0ur/image/upload/v1781524716/students/nmjjpliulya9sz1wqlzu.jpg",
              },
              userId: {
                _id: user?.id || user?._id,
                name: user?.name || "Alagar",
                email: user?.email || "alagar@gmail.com",
              },
            },
          ]);
        }
      }
    } catch (err) {
      console.error("Matrix compilation error:", err);
    } finally {
      setLocalLoading(false);
    }
  };

  useEffect(() => {
    loadStudentRecordsMatrix();
  }, [page, deptFilter, yearFilter, user]);

  useEffect(() => {
    if (isTeacher && students) {
      const cleanStudentsArray = extractSafeArray(students);
      if (cleanStudentsArray.length > 0) {
        setRenderedList(cleanStudentsArray);
      }
    }
  }, [students, isTeacher]);

  const handleQueryFormMatchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    loadStudentRecordsMatrix();
  };

  const initializeModificationWizard = (node) => {
    setTargetUpdateId(node._id);
    setEditForm({
      name: node.userId?.name || node.name || "",
      department: node.department,
      year: String(node.year),
      phone: node.phone,
      address: node.address,
    });
    setIsModalOpen(true);
  };

  const handleMutationCommitAction = async (e) => {
    e.preventDefault();
    setModalExecutionLoading(true);
    try {
      await updateStudent(targetUpdateId, {
        ...editForm,
        year: Number(editForm.year),
      });
      setIsModalOpen(false);
      loadStudentRecordsMatrix();
    } catch (err) {
      alert("Validation updates processing error.");
    } finally {
      setModalExecutionLoading(false);
    }
  };

  const handleErasurePurgeExecution = async (id) => {
    if (!window.confirm("Confirm permanent erasure execution?")) return;
    try {
      await deleteStudent(id);
      loadStudentRecordsMatrix();
    } catch (err) {
      alert("Clearance deletion execution error.");
    }
  };

  const safeRenderList = Array.isArray(renderedList) ? renderedList : [];

  return (
    <div className="space-y-4 bg-white dark:bg-zinc-950 p-6 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 text-zinc-900 dark:text-zinc-50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-4 border-zinc-100 dark:border-zinc-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Active Directories System Matrix
          </h1>
          <p className="text-xs text-zinc-500">
            Query and mutate live enrollment listings mapping constraints
            indices records rows fields.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70 dark:bg-zinc-900/40">
            <TableRow>
              <TableHead>Student Index Entity</TableHead>
              <TableHead>Matriculation Key</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Batch Class</TableHead>
              <TableHead>Routing Contact</TableHead>
              <TableHead className="text-right">Executions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(localLoading || loading) && safeRenderList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-32 text-zinc-500"
                >
                  <Loader2 className="animate-spin h-6 w-6 mx-auto mb-1 text-blue-600" />{" "}
                  Connecting tables indices mapping data views...
                </TableCell>
              </TableRow>
            ) : safeRenderList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center h-24 text-zinc-500"
                >
                  Zero active rows matched current search filter conditions
                  metrics layouts.
                </TableCell>
              </TableRow>
            ) : (
              safeRenderList.map((node) => (
                <TableRow
                  key={node._id}
                  className="hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/60"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={
                          node.profileImage?.secure_url ||
                          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=40&q=80"
                        }
                        className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        alt="Avatar Asset"
                      />
                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                          {node.userId?.name || node.name || "N/A"}
                        </div>
                        <div className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-none">
                          {node.userId?.email || user?.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-blue-600 dark:text-blue-400">
                    {node.studentId}
                  </TableCell>
                  <TableCell className="text-sm">{node.department}</TableCell>
                  <TableCell className="text-sm">Year {node.year}</TableCell>
                  <TableCell className="text-xs text-zinc-500 font-mono">
                    {node.phone}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {isTeacher && (
                        <>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-7 w-7 border-zinc-200 dark:border-zinc-700"
                            onClick={() => initializeModificationWizard(node)}
                          >
                            <Edit2 className="h-3.5 w-3.5 text-zinc-600 dark:text-zinc-400" />
                          </Button>
                          <Button
                            size="icon"
                            variant="destructive"
                            className="h-7 w-7"
                            onClick={() =>
                              handleErasurePurgeExecution(node._id)
                            }
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}

                      {!isTeacher && (
                        <span className="text-xs font-medium text-zinc-400 italic pr-2 select-none">
                          Read-Only Profile Row
                        </span>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <StudentFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleMutationCommitAction}
        editForm={editForm}
        setEditForm={setEditForm}
        loading={modalExecutionLoading}
      />
    </div>
  );
}
