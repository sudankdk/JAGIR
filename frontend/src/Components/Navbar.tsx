import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FaBriefcase className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-900">
              JagireNepali
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Find Jobs
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Companies
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Career Advice
            </a>
            <div className="flex items-center justify-between space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Link to="/login">Login</Link>
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Link to="/signin">Sign in</Link>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
