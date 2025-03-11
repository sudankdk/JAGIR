import React, { useState } from "react";
import { FaBriefcase, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../API/Endpont";
import { useAuth } from "../context/UseAuth";
import toast, { Toaster } from "react-hot-toast";



const RightSideLogin = () => {
  const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { auth_login } = useAuth();

  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const data = await login(username, password);
      if (data.success) {
        if(data.role==="JG")
        {
          auth_login({ username });
          navigate(`/dash`);
        }else 
        {
          auth_login({ username});
           navigate(`/Dashboard`);
        }
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleToast = () => {
    toast.success("Login ScuccessFull");
    toast.error("Login Failed");
    <Toaster position="top-right" />;
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-center mt-16 place-content-center space-x-2">
        <FaBriefcase className="h-8 w-8 text-blue-500" />
        <span className="text-2xl font-bold text-gray-900">JagireNepali</span>
      </div>

      {/* Login Form */}
      <form className="pl-24 mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="m-20">
          {/* Username Input */}
          <div className="relative m-2">
            <FaUser className="absolute top-4 left-4 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-12 p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative m-2">
            <FaLock className="absolute top-4 left-4 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-12 p-3 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            onClick={handleToast}
          >
            Log In
          </button>

          {/* Links */}
          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default RightSideLogin;
