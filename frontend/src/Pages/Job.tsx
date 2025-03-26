import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jobApplicant } from "../API/Endpont"; // Assuming you have this function
import Applicant from "../Components/Applicant";

const Job = () => {
  const { id } = useParams(); 
  const [applicant, setApplicant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleApplicantData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await jobApplicant(id); // Pass the job ID to fetch relevant applicants
      setApplicant(data);
    } catch (err) {
      setError("Failed to fetch job applicants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleApplicantData();
  }, [id]); // Re-fetch when the job ID changes

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading applicants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      {applicant.length > 0 ? (
        applicant.map((job) => <Applicant key={job.application_id} {...job} />)
      ) : (
        <p>No applicants found for this job.</p>
      )}
    </div>
  );
};

export default Job;
