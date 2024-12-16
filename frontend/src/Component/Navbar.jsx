import { useEffect, useState } from "react";
import { get_user_profile_data } from "../api/EndPoints";
import { get_username_from_url } from "../Constants/Reusables";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null); // Initialize as null
  const [error, setError] = useState(false); // For error handling
  const username = get_username_from_url(); // Direct constant assignment
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const data = await get_user_profile_data(username);
        console.log("Fetched user data:", data);
        setUser(data); // Set the fetched user data
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      }
    };

    if (username) fetchUserRole();
  }, [username]);

  return (
    <div className="h-screen bg-gray-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">My App</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/" className="hover:bg-gray-700 p-2 rounded">
          Home
        </Link>

        {/* User Role-Specific Navigation */}
        <div className="hover:bg-gray-700 p-2 rounded">
          {error ? (
            <span className="text-red-500">{"Fail to load"}</span>
          ) : user ? (
            user.role === "employer" ? (
              <button
                onClick={() => navigate(`/jobs/create/${username}`)}
                className="text-left w-full"
              >
                Create Job
              </button>
            ) : (
              <button
                onClick={() => navigate(`/jobs/apply/${username}`)}
                className="text-left w-full"
              >
                Apply Job
              </button>
            )
          ) : (
            <span>Loading...</span>
          )}
        </div>

        <Link to="/services" className="hover:bg-gray-700 p-2 rounded">
          Services
        </Link>
        <Link to="/contact" className="hover:bg-gray-700 p-2 rounded">
          Contact
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
