import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {/* Right Side */}
      <div>
        <div className="max-w-md mx-auto mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up</h2>
          <form className="space-y-6">
            {/* Username */}
            <div className="relative">
              <FaUser className="absolute top-4 left-4 text-gray-400" />
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-12 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-4 left-4 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-12 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-4 left-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-12 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Role */}
            <div className="relative">
              <select
                name="role"
                id="role"
                className=" text-gray-500 hover:text-gray-700"
              >
                <option value=""> Select </option>
                <option value="JS">Job Seeker</option>
                <option value="JG">Job Giver</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            >
              Sign Up
            </button>

            {/* Links */}
            <div className="flex justify-between mt-4 text-sm">
              <Link to="/login" className="text-blue-600 hover:underline">
                {" "}
                Already have an account? Log In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
