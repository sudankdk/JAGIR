import { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";
import { MdBarChart } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { Chart } from "./Chart";
import { useNavigate } from "react-router-dom";
const DashBodyJG = () => {
  const nav = useNavigate();
  const RedirectToLogin = () => {
    nav("/JG/applicant");
  };

  return (
    <div>
      {/* yo dash ko side nav ho*/}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Side Navigation */}
        <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
          <nav className="space-y-6">
            <div className="flex items-center space-x-4 bg-blue-600 text-white p-4 rounded-lg cursor-pointer">
              <HiOutlineSquares2X2 className="text-2xl" />
              <h2 className="text-lg font-semibold">Overview</h2>
            </div>

            <div
              className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer"
              onClick={RedirectToLogin}
            >
              <FaUserFriends className="text-2xl" />
              <h2 className="text-lg font-semibold">Applicant</h2>
            </div>

            <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
              <FaBriefcase className="text-2xl" />
              <h2 className="text-lg font-semibold"> Jobs</h2>
            </div>
          </nav>
        </div>

        {/* ya main body aauxa*/}
        <div className="w-full lg:w-4/5 p-6 bg-slate-100">
          <div className="m-2 p-4 bg-white shadow rounded-lg">
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
              <h2 className="text-lg font-medium text-gray-800">Dashboard</h2>
              <button className="bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-300">
                Post Job
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 m-8">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <LuUsers className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Applicants
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            246
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <span>+12%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaBriefcase className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Active Jobs
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            8
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MdBarChart className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Interview Rate
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            68%
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <span>+4%</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FaBriefcase className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Time to Hire
                        </dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">
                            15d
                          </div>
                          <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                            <span>-2d</span>
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-screen">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBodyJG;
