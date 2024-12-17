import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";

const DashNav = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Left Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <IoIosNotifications className="text-2xl text-gray-600 hover:text-blue-500" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            3
          </span>
        </div>

        {/* Message */}
        <p className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <FiMessageSquare className="text-2xl text-gray-600 hover:text-blue-500" />
        </p>

        {/* Profile Picture */}
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />

        {/* Username */}
        <p className="text-gray-800 font-semibold">Username</p>
      </div>
    </div>
  );
};

export default DashNav;
