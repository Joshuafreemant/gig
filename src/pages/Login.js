import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFetch } from "../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await postFetch("/auth/login", {
      email: userInfo?.email,
      password: userInfo?.password,
    }).then((response) => {
      if (response?.status === 200) {
        toast("Login Successful", {
          theme: "dark",
        });
        navigate("/profile");
        setLoading(false);
        dispatch(setUser(response?.data));
      } else {
        navigate("/login");
        console.log("response", response);
        toast(response?.response?.data.message, {
          theme: "dark",
        });
        setLoading(false);
      }
    });
  };
  return (
    <>
      <ToastContainer />

      <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  w-full">
          <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <h2 className="text-lg font-semibold">Login to your Account</h2>
          </div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="w-11/12 opacity-bg p-8 "
          >
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
              {loading ? (
                <p className="text-base m-0 text-white ">
                  Loading...
                </p>
              ) : (
                <button className="text-base m-0 text-white ">Login</button>
              )}
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
    </>
  );
};

export default Login;
