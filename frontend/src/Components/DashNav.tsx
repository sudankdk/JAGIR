import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { useAuth } from "../context/UseAuth";



const DashNav = () => {
  const {user}=useAuth()
  const getname = () => {
    console.log(user?.profile_image)
    const nameobject = localStorage.getItem("username");
    if (nameobject) {
      const name = JSON.parse(nameobject);
      return name.username;
    }
    return null;
  };
 
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
          src={'/api/'+user?.profile_image || "/default-profile.png"}
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
