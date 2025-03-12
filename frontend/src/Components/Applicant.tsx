import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { MdOutlinePreview } from "react-icons/md";

const Applicant = () => {
  const theme: { [key: string]: string } = {
    ACCEPTED: "text-green-600",
    PENDING: "text-yellow-600",
    REJECTED: "text-red-600",
  };
  const [colo, setColo] = useState<string>("");
  useEffect(() => {
    setColo(theme["PENDING"]);
  }, []);
  return (
    <div className="w-full bg-slate-200 text-black p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 items-center text-center py-4 px-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow">
        {/* Profile Picture */}
        <div className="flex items-center justify-center">
          <img
            className="h-14 w-14 rounded-full border-2 border-gray-300"
            src={""}
            alt="Profile"
          />
        </div>
        <div className="text-lg font-semibold">John Doe</div>
      </div>
      <div className="grid grid-cols-3 items-center text-center py-4 px-6 bg-white rounded-md shadow-sm hover:shadow-lg transition-shadow">
        {/* Name */}

        {/* Status */}
        <div
          className={`text-sm font-medium ${colo} bg-blue-100 px-6 py-1 rounded-full`}
        >
          {"Pending"}
        </div>

        {/* Download Icon */}
        <button className="text-2xl text-blue-600 flex items-center justify-center hover:text-blue-800 p-2 transition">
          <IoMdDownload />
        </button>

        {/* Preview CV */}
        <button className="text-2xl text-gray-600 flex items-center justify-center hover:text-gray-800 p-2 transition">
          <MdOutlinePreview />
        </button>
      </div>
    </div>
  );
};

export default Applicant;
