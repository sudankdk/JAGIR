import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { get_job_by_id } from "../API/Endpont"; // Assuming you have this function
import { JobDescriptionCard } from "./JobDescription";

const Job = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleJobData = async () => {
    setLoading(true);
    try {
      console.log("Fetching job details for ID:", id);
      const data = await get_job_by_id(id);
      console.log("Response data:", data);

      setJob(data); // Store the single job object
      setLoading(false);
    } catch (err) {
      console.error("Error fetching job:", err);
      setError("Failed to fetch job details. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleJobData();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-gray-500">
        <p>Loading job details...</p>
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

  if (!job) {
    return <p>No job details found.</p>;
  }

  return (
    <div>
      <JobDescriptionCard
        key={job.job_id}
        id={job.job_id}
        jobGiverName={job.user?.username || "Unknown"}
        job_name={job.job_name}
        location={job.location}
        dateCreated={new Date(job.created_at).toLocaleDateString()}
        Salary={job.salary}
        JobDescriptions={job.description}
        Skills={job.skills}
      />
    </div>
  );
};

export default Job;
