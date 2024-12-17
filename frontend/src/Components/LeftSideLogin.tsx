import React from "react";
import login from "../assets/login.jpg";

const LeftSideLogin = () => {
  return (
    <>
      <div className="rounded-full ring-8 ring-cyan-400 p-1 overflow-hidden ">
        <img
          src={login}
          alt="login image"
          className="w-44 h-44 rounded-full object-cover"
        />
      </div>
      <p className="mt-4 text-white text-xl font-semibold">
        Welcome to JagireNepali
      </p>
    </>
  );
};

export default LeftSideLogin;
