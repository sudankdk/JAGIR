import { useEffect, useState } from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { Link } from "react-router-dom";
import { allJobs, savedJobs } from "../API/Endpont";
import { Job } from "../interface/Interfaces";

// Reusable JobCard component
export const JobCard = ({ id, title, location, status, date }) => {
  return (
    <div
      id={id}
      className="bg-slate-100 m-4 p-4 rounded-lg shadow-sm cursor-pointer hover:translate-x-1 transition-transform duration-200"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{location}</p>
        </div>
        <div>
          <h4 className="font-medium text-blue-500">{status}</h4>
          <p className="text-sm text-gray-500">Date created: {date}</p>
        </div>
      </div>
    </div>
  );
};

const DashBody = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJob, setSavedJob] = useState<Job[]>([]);

  useEffect(() => {
    const handleAllJobs = async () => {
      try {
        const response = await allJobs();
        setJobs(response);
      } catch (error) {
        console.log(error);
      }
    };

    const handleSavedJobs = async () => {
      try {
        const res = await savedJobs();
        console.log(res);
        setSavedJob(res);
      } catch (error) {
        console.log(error);
      }
    };
    handleAllJobs();
    handleSavedJobs();
  }, []);
  return (
    <div className="h-screen flex flex-col lg:flex-row">
      {/* Left Side Navigation */}
      <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
        <nav className="space-y-6">
          <div className="flex items-center space-x-4 bg-blue-600 text-white p-4 rounded-lg cursor-pointer">
            <HiOutlineSquares2X2 className="text-2xl" />
            <h2 className="text-lg font-semibold">
              {" "}
              <Link to="/Dashboard">Overview</Link>
            </h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <FaBriefcase className="text-2xl" />
            <h2 className="text-lg font-semibold">
              <Link to="/Dashboard/application">Applications</Link>
            </h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <CiBookmark className="text-2xl" />
            <h2 className="text-lg font-semibold">
              {" "}
              <Link to="/Dashboard/bookmarks">Saved Jobs</Link>
            </h2>
          </div>

          <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
            <IoIosDocument className="text-2xl" />
            <h2 className="text-lg font-semibold">Resume upgrade</h2>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-4/5 p-8 bg-slate-100">
        <div className="m-2 p-4 bg-white shadow-lg rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link
              to="/Dashboard/application"
              className="text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
          {jobs?.length > 0 ? (
            jobs?.slice(0, 3).map((job) => (
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
            <p>No jobs available.</p>
          )}
        </div>

        {/* Saved Jobs Section */}
        <div className="m-2 p-4 bg-white shadow-lg rounded-lg mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Jobs</h2>
            <Link
              to="/Dashboard/bookmarks"
              className="text-blue-600 hover:underline"
            >
              View All
            </Link>
          </div>
          {savedJob?.length > 0 ? (
            savedJob?.slice(0, 3).map(({ job }) => (
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
            <p>No saved job.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBody;
