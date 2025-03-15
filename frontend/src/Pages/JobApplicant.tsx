import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import Applicant from "../Components/Applicant";
import { useEffect, useState } from "react";
import { jobApplicant } from "../API/Endpont";

const JobApplicant = () => {
  const [applicant, setApplicant] = useState([]);

  const handleApplicantData = async () => {
    const data = await jobApplicant();
    console.log(data);
    setApplicant(data);
  };
  useEffect(() => {
    handleApplicantData();
  }, []);
  return (
    <div>
      <div>
        {/* yo dash ko side nav ho*/}
        <div className="h-full flex flex-col lg:flex-row">
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
            {applicant?.length > 0 ? (
              applicant.map((job) => (
                <Applicant
                  key={job.job.job_id}
                  id={job.application_id}
                  name={job.applicant.username}
                  cv={job.cv}
                  status={job.application_status}
                  profile={job.applicant.profile_image}
                />
              ))
            ) : (
              <p>No Job Applicant</p>
            )}
            {/* <Applicant /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobApplicant;
