import React from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  w-full">
        <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <h2 className="text-lg font-semibold">Enter new password for recovery</h2>
        </div>
        <form className="w-11/12 opacity-bg p-8 ">
          <div className="flex flex-col">
            <label className="text-base text-white mb-1">New Password</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-base text-white mb-1">Confirm Password</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
            />
          </div>
          
          <div className="py-2 rounded-md mt-3 bg-[#1560bd] flex items-center w-full justify-center">
            <button className="text-base m-0 text-white ">Submit</button>
          </div>

          <div className="flex justify-between mt-4">
            <Link to="/login" className="text-base text-white">
              Login
            </Link>
            <Link to="/register" className="text-base text-white">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
