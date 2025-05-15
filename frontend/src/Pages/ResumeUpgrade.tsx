// src/components/UploadCV.tsx
import React, { useState } from "react";
import { cvScore } from "../API/Endpont";

const UploadCV: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
      setError("");
      setScore(null);
      setLabel(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    try {
      setLoading(true);
      const data = await cvScore(file.name, file);
      setScore(parseFloat(data.score.toFixed(2)));
      setLabel(data.label);
    } catch (err: any) {
      setError("An error occurred while uploading the CV.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Upload Your CV (PDF)
      </h2>

      <label
        htmlFor="cvFile"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select CV (PDF format only):
      </label>
      <input
        id="cvFile"
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 w-full text-sm border border-gray-300 p-2 rounded"
      />

      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload and Get Score"}
      </button>

      {score !== null && label && (
        <div className="mt-4 text-center">
          <p className="text-green-600 font-bold">CV Score: {score}</p>
          <p className="text-gray-700 font-medium">Label: {label}</p>
        </div>
      )}

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default UploadCV;
