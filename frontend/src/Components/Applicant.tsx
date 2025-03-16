import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";
import { SERVER_URL } from "../API/Server";

const Applicant = ({ id, profile, name, cv, status, job_name }) => {
  const theme: { [key: string]: string } = {
    ACCEPTED: "text-green-600",
    PENDING: "text-yellow-600",
    REJECTED: "text-red-600",
  };

  const handleCvDownload = () => {
    if (!cv) {
      return alert("Applicant must enter a CV");
    }

    const fileUrl = `${SERVER_URL}${cv}`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", `${name}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleCvOpen = () => {
    if (!cv) {
      return alert("Applicant must enter a CV");
    }

    const fileUrl = `${SERVER_URL}${cv}`; // Ensure the correct URL

    window.open(fileUrl, "_blank"); // Opens in a new tab
  };
  const [colo, setColo] = useState<string>("");
  useEffect(() => {
    setColo(theme[status]);
  }, []);
  return (
    <div className="w-full bg-slate-200 text-black p-4 rounded-lg shadow-md">
      <div
        className="grid grid-cols-3  items-center text-center py-4 px-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow"
        key={id}
      >
        {/* Profile Picture */}
        <div className="flex items-center gap-3 justify-center">
          <img
            className="h-14 w-14 rounded-full border-2 border-gray-300"
            src={`${SERVER_URL}` + profile || "/default-profile.png"}
            alt="Profile"
          />
          <div className="text-lg font-semibold">{name}</div>
        </div>
        {/* <div className="text-lg font-semibold">{name}</div> */}
        <div className="text-lg font-semibold">{job_name}</div>
      </div>
      <div className="grid grid-cols-2 items-center text-center py-4 px-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow">
        {/* Name */}

        {/* Status */}
        <div
          className={`text-sm font-medium ${colo} bg-blue-100 px-6 py-1 rounded-full`}
        >
          {status}
        </div>

        {/* Download Icon */}
        <button
          onClick={handleCvOpen}
          className="text-2xl text-blue-600 flex items-center justify-center hover:text-blue-800 p-2 transition"
        >
          <IoMdDownload />
        </button>

        {/* Preview CV */}
        {/* <button
          onClick={handleCvOpen}
          className="text-2xl text-gray-600 flex items-center justify-center hover:text-gray-800 p-2 transition"
        >
          <MdOutlinePreview />
        </button> */}
      </div>
    </div>
  );
};

export default Applicant;
