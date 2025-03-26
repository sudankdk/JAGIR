import { useEffect, useState } from "react";
import { allJobs } from "../API/Endpont";
import { Job } from "../interface/Interfaces";
import React from "react";
import { MapPin, CalendarDays, Briefcase, Coins } from "lucide-react";

export const JobDescriptionCard = ({
  id,
  jobGiverName,
  job_name,
  location,
  dateCreated,
  Salary,
  JobDescriptions,
  Skills,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleApply = () => {
    if (!cvFile) {
      alert("Please upload your CV before applying.");
      return;
    }

    alert(`You have applied for the job with CV: ${cvFile.name}`);
    setIsModalOpen(false);
  };

  return (
    <div
      id={id}
      className="max-w-4xl mx-auto my-6 p-6 bg-white shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-200 pb-6 mb-6">
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              {job_name}
            </h2>
            <p className="text-sm text-gray-500 font-medium">{jobGiverName}</p>
          </div>

          <div className="flex items-center space-x-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>{location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="w-5 h-5 text-green-500" />
              <span>{dateCreated}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold shadow-md hover:shadow-lg"
          >
            Apply Now
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-semibold border border-gray-200">
            Save Job
          </button>
        </div>
      </div>

      {/* Job Details Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2 text-purple-500" />
            Job Description
          </h3>
          <p className="text-gray-600 leading-relaxed">{JobDescriptions}</p>
        </div>

        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-green-500" />
              Salary
            </h3>
            <p className="text-gray-700 font-medium">{Salary}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <Coins className="w-5 h-5 mr-2 text-orange-500" />
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {Skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for CV Upload */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
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

const JobDescription = () => {
  const [jobs, setJobs] = useState<Job[] | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleAllJobs = async () => {
      try {
        const response = await allJobs();
        setJobs(response);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setIsLoading(false);
      }
    };
    handleAllJobs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto">
        {jobs?.length > 0 ? (
          jobs.map((job) => (
            <JobDescriptionCard
              key={job.job_id}
              id={job.job_id}
              jobGiverName={job.user.username}
              job_name={job.job_name}
              location={job.location}
              dateCreated={new Date(job.created_at).toLocaleDateString()}
              Salary={job.salary}
              JobDescriptions={job.description}
              Skills={job.skills}
            />
          ))
        ) : (
          <div className="text-center text-gray-500 text-xl">
            No Job Descriptions Available
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDescription;
