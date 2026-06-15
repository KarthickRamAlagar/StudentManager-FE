import React from "react";
import { UploadCloud, FileImage } from "lucide-react";

export default function FileUploader({ selectedFile, onFileChange }) {
  const handleFileSelectionChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-lg cursor-pointer bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900/60 transition-all p-4 text-center">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {selectedFile ? (
            <>
              <FileImage className="h-8 w-8 text-emerald-500 mb-2 animate-pulse" />
              <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-xs">
                {selectedFile.name}
              </p>
              <p className="text-[10px] text-zinc-400 mt-0.5">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to
                dispatch
              </p>
            </>
          ) : (
            <>
              <UploadCloud className="h-8 w-8 text-blue-600 dark:text-blue-500 mb-2" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Click to browse image profile
              </p>
              <p className="text-[11px] text-zinc-400 mt-1">
                JPEG, PNG, AVIF or JPG (Max 20MB limit)
              </p>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/jpeg,image/png,image/jpg,image/avif"
          className="hidden"
          onChange={handleFileSelectionChange}
        />
      </label>
    </div>
  );
}
