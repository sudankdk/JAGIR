import LeftSideLogin from "../Components/LeftSideLogin";
import RightSideLogin from "../Components/RightSideLogin";

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-2/5 bg-blue-800 p-4 flex flex-col justify-center items-center">
        <LeftSideLogin />
      </div>

      {/* Right Side */}
      <div className="w-3/5 p-8">
        <RightSideLogin />
      </div>
    </div>
  );
};

export default Login;
