import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit=()=>{
    setLoading(true);

  }
  return (
    <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  w-full">
        <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
          <h1 className="text-3xl font-bold">Forgot Password?</h1>
          <h2 className="text-lg font-semibold">Enter your email for recovery</h2>
        </div>
        <form onSubmit={()=>{handleSubmit()}} className="w-11/12 opacity-bg p-8 ">
          <div className="flex flex-col">
            <label className="text-base text-white mb-1">Email Address</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
            />
          </div>
          
          <div className="py-2 rounded-md mt-3 bg-[#1560bd] flex items-center w-full justify-center">
            {loading ? (
                <p className="text-base m-0 text-white ">
                  Loading...
                </p>
              ) : (
                <button className="text-base m-0 text-white ">Submit</button>
              )}
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

export default ForgotPassword;
