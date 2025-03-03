import { useEffect, useState } from "react";
import { allJobs } from "../Services/Endpont";
import { Job } from "../interface/Interfaces";
import React from "react";

const JobDescriptionCard = ({
  id,
  jobGiverName,
  job_name,
  location,
  dateCreated,
  Salary,
  JobDescriptions,
  Skills,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [cvFile, setCvFile] = useState(null); // State to store CV file

  const handleFileChange = (e: React.SyntheticEvent) => {
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
    <div
      id={id}
      className="max-w-3xl mx-auto m-8 p-6 bg-white shadow-lg rounded-lg"
    >
      <div className="flex flex-col md:flex-row justify-between items-start border-b pb-4 mb-4">
        <div className="flex-1">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {jobGiverName}
            </h2>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{job_name}</h2>
            <p className="text-gray-500">🌍 {location}</p>
            <p className="text-gray-500">📅 {dateCreated}</p>
            <p className="text-gray-500">👥 No. of Applicants</p>
          </div>
        </div>
        {/* Buttons Section */}
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Apply
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
            Save
          </button>
        </div>
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

      {/* Job Description Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {JobDescriptions}
        </h2>
        <h2 className="text-lg font-medium text-gray-700 mb-2">💰 {Salary}</h2>
        <p className="text-gray-600">🔧 {Skills}</p>
      </div>
    </div>
  );
};

const JobDescription = () => {
  const [jobs, setJobs] = useState<Job[] | null>();

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
  }, []);

  return (
    <div>
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
        <p>No Job Description</p>
      )}
    </div>
  );
};

export default JobDescription;
