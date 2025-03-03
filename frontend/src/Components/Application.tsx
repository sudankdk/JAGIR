import React, { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
// import { Link } from "react-router-dom";
import { allJobs, applyJob, savedJobs } from "../Services/Endpont";
import toast, { Toaster } from "react-hot-toast";
import { Job } from "../interface/Interfaces";
// Reusable JobCard component
const JobCard = ({ id, title, location, status, date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);
  const [jobId, setJobId] = useState<string>("");

  const handleFileChange = (e: React.SyntheticEvent) => {
    const file = e.target.files[0];
    if (file) {
      setCvFile(file);
    }
  };

  const uploadCV = async (id, cvFile) => {
    try {
      const data = await applyJob(id, cvFile);
      console.log(data);
    } catch (error) {
      console.log("errror in uploading cv ", error);
    }
  };

  const handleApply = async () => {
    if (!cvFile) {
      // alert("Please upload your CV before applying.");
      toast.error("Please upload your CV before applying");
      // console.log("notification ya aaunu parne ho");
      return;
    }
    // alert(`You have applied for the job with CV: ${cvFile.name}`);

    // toast.success(`You have applied for the job with CV: ${cvFile.name}`);
    try {
      await toast.promise(uploadCV(id, cvFile), {
        loading: "Uploading...",
        success: <b>Applied to job. </b>,
        error: <b>Could not apply</b>,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div
      id={id}
      className="bg-slate-100 m-4 p-4 rounded-lg cursor-pointer shadow-sm " // hover:translate-x-1 transition-transform duration-200"
    >
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-center hover:translate-x-1 transition-transform duration-200">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div>
          <h4 className="font-medium text-blue-500">{status}</h4>
          <p className="text-sm text-gray-500">Date Created: {date}</p>
        </div>
      </div>

      {/* Apply Button */}
      <button
        onClick={() => {
          setIsModalOpen(true);
          setJobId(id);
        }}
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

const Application = () => {
  const [jobs, setJobs] = useState<Job[]>();

  useEffect(() => {
    const handleAllJobs = async () => {
      try {
        const response = await allJobs();
        setJobs(response);
      } catch (error) {
        console.log(error);
      }
    };

    handleAllJobs();
    // handleSavedJobs();
  }, []);
  return (
    <div className="h-auto flex flex-col lg:flex-row">
      {/* Left Side Navigation */}
      <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
        <nav className="space-y-6">
          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <HiOutlineSquares2X2 className="text-2xl" />
            <h2 className="text-lg font-semibold">Overview</h2>
          </div>

          <div className="flex items-center space-x-4 bg-blue-600 text-white p-4 rounded-lg cursor-pointer">
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
            <h2 className="text-xl font-semibold">Applications</h2>
          </div>
          {jobs?.length > 0 ? (
            jobs?.map((job) => (
              <JobCard
                key={job.job_id}
                id={job.job_id}
                title={job.job_name}
                location={job.location}
                status={job.status}
                date={new Date(job.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            ))
          ) : (
            <p>No Jobs available </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Application;
