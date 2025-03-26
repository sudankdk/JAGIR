import React, { useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import {
  FaBriefcase,
  FaUserFriends,
  FaTrash,
  FaLock,
  FaLockOpen,
  FaEllipsisV,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const JGApplication = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const toggleDropdown = (jobId) => {
    setActiveDropdown(activeDropdown === jobId ? null : jobId);
  };

  const handleStatusChange = (jobId, newStatus) => {
    setJobs(
      jobs.map((job) =>
        job.job_id === jobId ? { ...job, status: newStatus } : job
      )
    );
    setActiveDropdown(null);
    // API call would go here
    console.log(`Changed job ${jobId} status to ${newStatus}`);
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.job_id !== jobId));
    // API call would go here
    console.log(`Deleted job ${jobId}`);
  };
  // Sample data - in your app, this would come from props or API
  const jobs = [
    {
      job_id: "043cb71d-e947-499d-a5c9-d3dc31d1349a",
      job_name: "frontend",
      location: "Jhapa",
      description: "this is a nice job",
      salary: "1245.00",
      created_at: "2025-02-09T14:56:45.357999Z",
      status: "open",
      skills: "JS NODE",
    },
    {
      job_id: "a0c67610-aaaf-404e-9f59-96eed6b84223",
      job_name: "frontend",
      location: "Ithari",
      description: "this is a nice job",
      salary: "1245.00",
      created_at: "2024-12-23T16:48:47.809868Z",
      status: "open",
      skills: "JS NODE",
    },
    {
      job_id: "38c8752f-d23c-4790-afaa-2a96f12a28a0",
      job_name: "SWE",
      location: "Ithari",
      description: "this is a great ass job",
      salary: "1245.00",
      created_at: "2024-12-21T10:21:58.144067Z",
      status: "closed",
      skills: "JS NODE",
    },
    {
      job_id: "dfca0d3e-6bf9-4564-9b32-517770c9f937",
      job_name: "UI/UX",
      location: "Ithari",
      description: "this is a bad ass job",
      salary: "12345.00",
      created_at: "2024-12-19T11:43:05.639582Z",
      status: "open",
      skills: "JAVA",
    },
  ];

  // Format date to be more readable

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left Side Navigation */}
      <div className="w-full lg:w-1/5 bg-blue-800 text-white p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">JobGiver Dashboard</h1>
        </div>

        <nav className="space-y-4">
          <Link
            to="/JG/dashboard"
            className="flex items-center space-x-3 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
          >
            <HiOutlineSquares2X2 className="text-xl" />
            <span className="text-lg font-medium">Overview</span>
          </Link>

          <Link
            to="/JG/applicant"
            className="flex items-center space-x-3 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
          >
            <FaUserFriends className="text-xl" />
            <span className="text-lg font-medium">Applicants</span>
          </Link>

          <div className="flex items-center space-x-3 bg-blue-700 text-white p-3 rounded-lg">
            <FaBriefcase className="text-xl" />
            <span className="text-lg font-medium">My Jobs</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">My Job Postings</h2>
          <Link
            to="/JG/jobs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Post New Job
          </Link>
        </div>

        <div className="grid gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={job.job_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
                job.status === "open" ? "border-green-500" : "border-gray-400"
              } relative`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {job.job_name}
                    </h3>
                    <div className="flex items-center mt-1 text-gray-600">
                      <span className="mr-4">{job.location}</span>
                      <span>${job.salary}</span>
                    </div>
                  </div>

                  {/* Dropdown Trigger */}
                  <div className="relative">
                    <button
                      onClick={() => toggleDropdown(job.job_id)}
                      className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
                    >
                      <FaEllipsisV />
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {activeDropdown === job.job_id && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
                        >
                          <div className="py-1">
                            {job.status === "open" ? (
                              <button
                                onClick={() =>
                                  handleStatusChange(job.job_id, "closed")
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Close Job
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleStatusChange(job.job_id, "open")
                                }
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Reopen Job
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteJob(job.job_id)}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete Job
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">{job.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.skills.split(" ").map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                  <span>Posted on {formatDate(job.created_at)}</span>
                  <span
                    className={`px-2 py-1 rounded-full ${
                      job.status === "open"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {jobs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl text-gray-600">
              You haven't posted any jobs yet
            </h3>
            <Link
              to="/JG/jobs/new"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Your First Job Posting
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default JGApplication;
