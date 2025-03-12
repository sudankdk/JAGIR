import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { userInfo } from "../API/Endpont";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../API/Server";



const DashNav = () => {
  const [pp,setPP]=useState<string>("")
  const userData=async()=>{
    const data=await userInfo();
    setPP(data.profile_image)
  }
  const getname = () => {
    const nameobject = localStorage.getItem("username");
    if (nameobject) {
      const name = JSON.parse(nameobject);
      return name.username;
    }
    return null;
  };
  useEffect(()=>{
    userData()
    console.log(pp)
  },[])
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300 bg-white">
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
          src={`${SERVER_URL}`+pp || "/default-profile.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border-2 border-blue-500"
        />

        {/* Username */}
        <p className="text-gray-800 font-semibold">{getname()}</p>
      </div>
    </div>
  );
};

export default DashNav;
