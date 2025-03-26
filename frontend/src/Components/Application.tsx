import React, { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { allJobs, applyJob } from "../API/Endpont";
import toast, { Toaster } from "react-hot-toast";
import { Job } from "../interface/Interfaces";
import { Link, useNavigate } from "react-router-dom";
import {
  FileText,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
} from "lucide-react";
import { nav } from "motion/react-client";

// Reusable JobCard component
const JobCard = ({ id, title, location, status, date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const uploadCV = async (id: string, cvFile: File) => {
    try {
      const data = await applyJob(id, cvFile);
      console.log(data);
    } catch (error) {
      console.error("Error in uploading CV", error);
      throw error;
    }
  };

  const handleApply = async () => {
    if (!cvFile) {
      toast.error("Please upload your CV before applying");
      return;
    }

    try {
      await toast.promise(uploadCV(id, cvFile), {
        loading: "Uploading application...",
        success: <b>Successfully applied to job</b>,
        error: <b>Could not apply to job</b>,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-green-500";
      case "closed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-sm hover:shadow-md transition-all duration-300 group">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>

        <div className="text-right space-y-1">
          <h4 className={`font-semibold ${getStatusColor(status)}`}>
            {status}
          </h4>
          <div className="flex items-center space-x-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <p className="text-sm">{date}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
            cvFile
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>
            {status === "open" ? (cvFile ? "Uploaded" : "Apply Now") : "Closed"}
          </span>
        </button>

        {/* <div className="flex space-x-2">
          <button
            className="text-green-500 hover:bg-green-50 p-2 rounded-full"
            title="Shortlist"
          >
            <CheckCircle className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 hover:bg-red-50 p-2 rounded-full"
            title="Reject"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </div> */}
        <Link
          to={`/job/${id}`}
          className="text-blue-600 hover:underline mt-4 block text-center"
        >
          View Details
        </Link>
      </div>

      {/* Modal for CV Upload */}
      {status == "open" && isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Apply for the Job
            </h2>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Upload CV/Resume
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {cvFile && (
                <div className="mt-2 text-sm text-green-600">
                  CV Uploaded: {cvFile.name}
                </div>
              )}
            </div>

            <button
              onClick={handleApply}
              disabled={!cvFile}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold disabled:opacity-50"
            >
              Submit Application
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main Application Component
const Application = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const nav = useNavigate();
  useEffect(() => {
    const handleAllJobs = async () => {
      try {
        const response = await allJobs();
        setJobs(response);
        setFilteredJobs(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setIsLoading(false);
        toast.error("Failed to load jobs");
      }
    };

    handleAllJobs();
  }, []);

  // Filter jobs based on status
  useEffect(() => {
    if (filter === "all") {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter(
        (job) => job.status.toLowerCase() === filter.toLowerCase()
      );
      setFilteredJobs(filtered);
    }
  }, [filter, jobs]);
  const handleSingleJob = () => {
    nav("/job/description/details");
  };

  const renderSideNavigation = () => (
    <div className="w-full min-h-screen lg:w-1/5 bg-blue-800 text-white p-8">
      <nav className="space-y-6">
        <NavItem
          icon={<HiOutlineSquares2X2 className="text-2xl" />}
          text="Overview"
          to="/Dashboard"
        />
        <NavItem
          icon={<FaBriefcase className="text-2xl" />}
          text="Applications"
          to="/Dashboard/application"
          active
        />
        <NavItem
          icon={<CiBookmark className="text-2xl" />}
          text="Saved Jobs"
          to="/Dashboard/bookmarks"
        />
        <NavItem
          icon={<IoIosDocument className="text-2xl" />}
          text="Resume Upgrade"
          to="/resume-upgrade"
        />
      </nav>
    </div>
  );

  const renderJobsSection = () => (
    <div className="w-full lg:w-4/5 p-8 bg-gray-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Job Applications</h2>
          <div className="flex space-x-2">
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors pr-8"
              >
                <option value="all">All Jobs</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
              <Filter
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-600"
                size={18}
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-4">
            {filteredJobs.map((job) => (
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
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            <p className="text-xl">No job applications found</p>
            <p className="text-sm mt-2">
              Start exploring and applying to jobs!
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // Helper component for navigation items
  const NavItem = ({ icon, text, to, active = false }) => (
    <div
      className={`flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer ${
        active ? "bg-blue-600" : ""
      }`}
    >
      {icon}
      <h2 className="text-lg font-semibold">
        <Link to={to}>{text}</Link>
      </h2>
    </div>
  );

  return (
    <div className="h-auto flex flex-col lg:flex-row">
      {renderSideNavigation()}
      {renderJobsSection()}
    </div>
  );
};

export default Application;
