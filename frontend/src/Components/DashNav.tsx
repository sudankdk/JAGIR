import { IoIosNotifications } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { logout, userInfo } from "../API/Endpont";
import { useEffect, useState, useRef } from "react";
import { SERVER_URL } from "../API/Server";
import { useNavigate } from "react-router-dom";

const DashNav = () => {
  const [pp, setPP] = useState<string>("");
  const [clicked, setClicked] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleProfile = () => {
    nav("/profile");
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userInfo();
      setPP(data.profile_image || "default-profile.png");
    };
    fetchUserData();
  }, []);

  const dismiss = async () => {
    await logout();
    nav("/login");
  };

  const getname = () => {
    const nameobject = localStorage.getItem("username");
    if (nameobject) {
      const name = JSON.parse(nameobject);
      return name.username;
    }
    return null;
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center px-8 py-4 border-b-2 border-gray-300 bg-white">
      {/* Left Section */}
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Right Section */}
      <div className="flex items-center space-x-6 relative">
        {/* Notification Icon */}
        <div className="relative cursor-pointer">
          <IoIosNotifications className="text-2xl text-gray-600 hover:text-blue-500" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">
            3
          </span>
        </div>

        {/* Message Icon */}
        <FiMessageSquare className="text-2xl text-gray-600 hover:text-blue-500 cursor-pointer" />

        {/* Profile Picture */}
        <div ref={profileRef} className="relative">
          <img
            className="h-14 w-14 rounded-full border-2 border-blue-500 cursor-pointer"
            src={`${SERVER_URL}${pp}`}
            alt="Profile"
            onClick={() => setClicked((prev) => !prev)}
          />

          {/* Profile Dropdown */}
          {clicked && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-2">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleProfile}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={dismiss}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Username */}
        <p className="text-gray-800 font-semibold">{getname()}</p>
      </div>
    </div>
  );
};

export default DashNav;
