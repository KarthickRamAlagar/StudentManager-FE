import React, { useEffect, useState } from "react";
import { useStudentData } from "../../hooks/useStudentData";
import {
  User,
  Mail,
  Shield,
  ShieldCheck,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";

export default function StudentCardView({ user }) {
  const { fetchStudentById } = useStudentData();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const resolveLiveProfilePayload = async () => {
      try {
        const searchId = user?.studentProfileId || user?.id || user?._id;
        const response = await fetchStudentById(searchId);

        const studentProfileData = response?.data || response;
        if (studentProfileData && Object.keys(studentProfileData).length > 0) {
          setProfile(studentProfileData);
        }
      } catch (err) {
        console.warn(
          "Using baseline session context fallback structures safely.",
        );
      } finally {
        setLoading(false);
      }
    };
    if (user) resolveLiveProfilePayload();
  }, [user, fetchStudentById]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-2">
        <Loader2 className="w-7 h-7 animate-spin text-blue-600" />
        <p className="text-xs text-zinc-400 font-medium">
          Assembling secure data matrix grid views...
        </p>
      </div>
    );
  }

  const displayName =
    profile?.userId?.name || profile?.name || user?.name || "Alagar";
  const displayEmail =
    profile?.userId?.email || user?.email || "alagar@gmail.com";
  const displayDepartment = profile?.department || user?.department || "CSE-DS";
  const displayYear = profile?.year || user?.year || 2;
  const displayPhone = profile?.phone || user?.phone || "9360600425";
  const displayAddress = profile?.address || user?.address || "Andhra Pradesh";
  const displayMatriculationKey = profile?.studentId || "STU001";

  const imageSource =
    profile?.profileImage?.secure_url ||
    user?.profileImage?.secure_url ||
    "https://res.cloudinary.com/dpciig0ur/image/upload/v1781524716/students/nmjjpliulya9sz1wqlzu.jpg";

  return (
    <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden max-w-4xl mx-auto mt-4">
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left Side: Square Avatar Display Frame with Corner Radius */}

        <div className="flex flex-col items-center text-center p-4 border-b md:border-b-0 md:border-r border-zinc-100 h-full justify-center">
          <div className="w-28 h-32 rounded-2xl bg-zinc-50 border-4 border-zinc-100 flex items-center justify-center shadow-inner relative overflow-hidden">
            {imageSource ? (
              <img
                src={imageSource}
                alt="Profile Avatar"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <User className="w-12 h-12 text-zinc-400" />
            )}

            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>

          <h3 className="mt-4 text-xl font-bold text-zinc-900 capitalize">
            {displayName}
          </h3>
          <span className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 uppercase tracking-wider">
            <Shield className="w-3 h-3" /> {user?.role || "Student"}
          </span>
        </div>

        {/* Right Side: Identity Parameters Details Grid */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Academic Parameters
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                <p className="text-xs text-zinc-400 font-medium">
                  Matriculation Key ID
                </p>
                <p className="text-sm font-mono font-bold text-blue-600 mt-0.5">
                  {displayMatriculationKey}
                </p>
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                <p className="text-xs text-zinc-400 font-medium">
                  Department Group
                </p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                  {displayDepartment}
                </p>
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                <p className="text-xs text-zinc-400 font-medium">
                  Batch Class Year
                </p>
                <p className="text-sm font-semibold text-zinc-800 mt-0.5">
                  Year {displayYear}
                </p>
              </div>
              <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                <p className="text-xs text-zinc-400 font-medium">
                  Account Status
                </p>
                <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1 mt-0.5 capitalize">
                  <ShieldCheck className="w-4 h-4" /> {user?.status || "Active"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-100 pt-4">
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
              Contact Specifications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-zinc-600">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-sm font-medium truncate">
                  {displayEmail}
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600">
                <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-sm font-medium font-mono">
                  {displayPhone}
                </span>
              </div>
              <div className="flex items-center gap-3 text-zinc-600 sm:col-span-2">
                <MapPin className="w-4 h-4 text-zinc-400 shrink-0" />
                <span className="text-sm font-medium truncate">
                  {displayAddress}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
