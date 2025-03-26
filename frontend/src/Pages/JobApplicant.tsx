import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase, FaUserFriends } from "react-icons/fa";
import Applicant from "../Components/Applicant";
import { useEffect, useState } from "react";
import { jobApplicant } from "../API/Endpont";
import { Link } from "react-router-dom";

const JobApplicant = () => {
  const [applicant, setApplicant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleApplicantData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await jobApplicant();
      console.log(data);
      setApplicant(data);
    } catch (err) {
      setError("Failed to fetch job applicants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApplicantData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side Navigation */}
      <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
        <nav className="space-y-6">
          <div className="flex items-center space-x-4 hover:bg-blue-600 text-white p-4 rounded-lg cursor-pointer">
            <HiOutlineSquares2X2 className="text-2xl" />
            <h2 className="text-lg font-semibold">
              <Link to="/JG/dashboard">Overview</Link>
            </h2>
          </div>

          <div className="flex items-center space-x-4 bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <FaUserFriends className="text-2xl" />
            <h2 className="text-lg font-semibold">
              <Link to="/JG/applicant">Applicant</Link>
            </h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <FaBriefcase className="text-2xl" />
            <h2 className="text-lg font-semibold">
              <Link to="/jobs">Jobs</Link>
            </h2>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-6 text-gray-800">
        {loading ? (
          <div className="text-center text-lg font-semibold">
            Loading applicants...
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
            <button
              onClick={handleApplicantData}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Retry
            </button>
          </div>
        ) : applicant.length > 0 ? (
          applicant.map((job) => (
            <Applicant
              key={job.application_id}
              id={job.application_id}
              name={job.applicant.username}
              cv={job.cv}
              initialStatus={job.application_status}
              profile={job.applicant.profile_image}
              job_name={job.job.job_name}
            />
          ))
        ) : (
          <div className="text-center text-gray-500">
            <p>No Job Applicants Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobApplicant;
