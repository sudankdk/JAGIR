import React from "react";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosDocument } from "react-icons/io";
import { Link } from "react-router-dom";

// Reusable JobCard component
const JobCard = ({ title, company, status, date }) => {
  return (
    <div className="bg-slate-100 m-4 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
        <div>
          <h4 className="font-medium text-blue-500">{status}</h4>
          <p className="text-sm text-gray-500">Date Applied: {date}</p>
        </div>
      </div>
    </div>
  );
};

const DashBody = () => {
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
            <h2 className="text-xl font-semibold">Recent Applications</h2>
            <Link to="#" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <JobCard
            title="Job Title"
            company="Company Name"
            status="Status"
            date="Date"
          />
          <JobCard
            title="Job Title"
            company="Company Name"
            status="Status"
            date="Date"
          />
        </div>

        {/* Saved Jobs Section */}
        <div className="m-2 p-4 bg-white shadow-lg rounded-lg mt-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Jobs</h2>
            <Link to="#" className="text-blue-600 hover:underline">
              View All
            </Link>
          </div>

          <JobCard
            title="Job Title"
            company="Company Name"
            status="Status"
            date="Date"
          />
          <JobCard
            title="Job Title"
            company="Company Name"
            status="Status"
            date="Date"
          />
        </div>
      </div>
    </div>
  );
};

export default DashBody;
