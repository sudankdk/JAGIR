import { useState, useEffect, useRef } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import { SERVER_URL } from "../API/Server";
import { updateStatus } from "../API/Endpont";

const Applicant = ({ id, profile, name, cv, initialStatus, job_name }) => {
  const statusOptions = ["PENDING", "ACCEPTED", "REJECTED"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const theme: { [key: string]: string } = {
    ACCEPTED: "text-green-600 bg-green-100",
    PENDING: "text-yellow-600 bg-yellow-100",
    REJECTED: "text-red-600 bg-red-100",
  };

  const [status, setStatus] = useState(initialStatus);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStatusChange = (newStatus: string) => {
    console.log("status ", newStatus);
    handleAplicant(id, newStatus);
    setIsDropdownOpen(false);
  };

  const handleCvDownload = () => {
    if (!cv) {
      return alert("Applicant must enter a CV");
    }
    const fileUrl = `${SERVER_URL}${cv}`;
    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", `${name}_CV.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAplicant = async (id: number, newStatus: string) => {
    try {
      const data = await updateStatus(id, newStatus);
      if (data) setStatus(newStatus);
    } catch (error) {
      console.error("Failed to update applicant status:", error);
    }
  };

  const handleCvOpen = () => {
    if (!cv) {
      return alert("Applicant must enter a CV");
    }
    window.open(`${SERVER_URL}${cv}`, "_blank");
  };

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 mb-4">
      <div className="grid grid-cols-3 items-center p-4 border-b border-gray-100">
        {/* Profile Section */}
        <div className="flex items-center justify-center space-x-4">
          <img
            className="h-16 w-16 rounded-full object-cover border-2 border-gray-300"
            src={profile ? `${SERVER_URL}${profile}` : "/default-profile.png"}
            alt={`${name}'s profile`}
          />
          <div className="text-lg font-semibold text-gray-800">{name}</div>
        </div>

        {/* Job Title */}
        <div className="text-lg font-medium text-gray-700 text-center">{job_name}</div>

        {/* Status Dropdown */}
        <div ref={dropdownRef} className="relative flex items-center justify-center">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`${theme[status]} px-4 py-1 rounded-full text-sm font-medium text-center cursor-pointer hover:opacity-80 transition-opacity`}
          >
            {status}
          </div>

          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {statusOptions
                .filter((opt) => opt !== status)
                .map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleStatusChange(opt)}
                    className={`${theme[opt]} px-4 py-2 text-sm cursor-pointer hover:opacity-80 transition-opacity`}
                  >
                    {opt}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end p-3 space-x-3">
        <button
          onClick={handleCvOpen}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
          title="View CV"
        >
          <MdOutlinePreview className="text-2xl" />
        </button>
        <button
          onClick={handleCvDownload}
          className="text-green-600 hover:text-green-800 transition-colors duration-200 p-2 rounded-full hover:bg-green-50"
          title="Download CV"
        >
          <IoMdDownload className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Applicant;
