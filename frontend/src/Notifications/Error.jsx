import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const Error = ({ text }) => {
  useEffect(() => {
    if (text) {
      toast.error(text); // Trigger toast error when 'text' changes
    }
  }, [text]); // Dependency array ensures toast only triggers when 'text' changes

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Error;
