import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import Applicant from "../Components/Applicant";

const JobApplicant = () => {
  return (
    <div>
      <div>
        {/* yo dash ko side nav ho*/}
        <div className="h-screen flex flex-col lg:flex-row">
          {/* Left Side Navigation */}
          <div className="w-full lg:w-1/5 bg-blue-800 text-white p-8">
            <nav className="space-y-6">
              <div className="flex items-center space-x-4 hover:bg-blue-600 text-white p-4 rounded-lg cursor-pointer">
                <HiOutlineSquares2X2 className="text-2xl" />
                <h2 className="text-lg font-semibold">Overview</h2>
              </div>

              <div className="flex items-center space-x-4 bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
                <FaUserFriends className="text-2xl" />
                <h2 className="text-lg font-semibold">Applicant</h2>
              </div>

              <div className="flex items-center space-x-4 hover:bg-blue-600 hover:text-white p-4 rounded-lg cursor-pointer">
                <FaBriefcase className="text-2xl" />
                <h2 className="text-lg font-semibold"> Jobs</h2>
              </div>
            </nav>
          </div>
          <div className="w-full lg:w-4/5 p-6 text-white ">
            <Applicant />
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobApplicant;
