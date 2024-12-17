import React, { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { Link } from "react-router-dom";

// Reusable JobCard component
const JobCard = ({ title, company }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [cvFile, setCvFile] = useState(null); // State to store CV file

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleApply = () => {
    if (!cvFile) {
      alert("Please upload your CV before applying.");
    } else {
      alert(`You have applied for the job with CV: ${cvFile.name}`);
      setIsModalOpen(false); // Close modal after applying
    }
  };

  return (
    <div className="bg-slate-100 m-4 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
      >
        Apply
      </button>

      {/* Modal for CV Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Upload Your CV</h2>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                Close
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Bookmarks = () => {
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left Side Navigation */}
      <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
        <nav className="space-y-6">
          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <HiOutlineSquares2X2 className="text-2xl" />
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <FaBriefcase className="text-2xl" />
            <h2 className="text-lg font-semibold">Applications</h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <CiBookmark className="text-2xl" />
            <h2 className="text-lg font-semibold">Saved Jobs</h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <IoIosDocument className="text-2xl" />
            <h2 className="text-lg font-semibold">Resume Upgrade</h2>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-8 bg-slate-100">
        <div className="m-2 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bookmarks</h2>
          </div>

          <JobCard title="Job Title" company="Company Name" />
          <JobCard title="Job Title" company="Company Name" />
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
