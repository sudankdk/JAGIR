import { FaBriefcase } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <FaBriefcase className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">JobHub</span>
            </div>
            <p className="text-gray-400">
              Connecting talented professionals with amazing opportunities
              worldwide.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              For Job Seekers
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Career Advice
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Resume Builder
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Job Alerts
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              For Employers
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-500">
                  Post a Job
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Browse Candidates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Pricing Plans
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-500">
                  Recruitment Solutions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-500">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-blue-500">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} JobHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
