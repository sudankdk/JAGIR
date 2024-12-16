import toast, { Toaster } from "react-hot-toast";

const Success = ({ text }) => {
  toast.success(text);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Success;
