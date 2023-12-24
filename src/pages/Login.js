import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
      <form className="w-11/12 opacity-bg p-8 ">
        <div className="flex flex-col">
          <label className="text-base text-white mb-1">Username</label>
          <input
            type="text"
            className="px-3 text-base py-3 rounded-md bg-white border-none"
          />
        </div>
        <div className="flex flex-col my-3">
          <label className="text-base text-white mb-1">Password</label>
          <input
            type="password"
            className="px-3 text-base py-3 rounded-md bg-white border-none"
          />
        </div>
        <div className="py-2 rounded-md mt-3 bg-[#1560bd] flex items-center w-full justify-center">
          <Link to="/profile"><button className="text-base m-0 text-white ">Login</button></Link>
        </div>

        <div className="flex justify-between mt-4">
          <Link to="/register" className="text-base text-white">
            Register
          </Link>
          <Link to="" className="text-base text-white">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
