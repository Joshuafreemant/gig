import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../apiCalls";

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginApi("/auth/login", {
      email: userInfo.email,
      password: userInfo.password
    }).then((response) => {
      if(response?.status===200){
        navigate("/profile");
      }else{
        navigate("/login");
      }
    });
  };
  return (
    <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  w-full">
        <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
          <h1 className="text-4xl font-bold">Welcome</h1>
          <h2 className="text-2xl font-semibold">Login to your Account</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="w-11/12 opacity-bg p-8 ">
          <div className="flex flex-col">
            <label className="text-base text-white mb-1">Email</label>
            <input
              type="text"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col my-3">
            <label className="text-base text-white mb-1">Password</label>
            <input
              type="password"
              className="px-3 text-base py-3 rounded-md bg-white border-none"
              onChange={(e) =>
                setUserInfo({
                  ...userInfo,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div className="py-2 rounded-md mt-3 bg-[#1560bd] flex items-center w-full justify-center">
            <button className="text-base m-0 text-white ">Login</button>
          </div>

          <div className="flex justify-between mt-4">
            <Link to="/register" className="text-base text-white">
              Register
            </Link>
            <Link to="/forgot-password" className="text-base text-white">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
