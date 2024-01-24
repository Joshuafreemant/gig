import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFetch, postFetch } from "../../apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AdminSignup = () => {
  const navigate = useNavigate();
  const [allSets, setAllSets] = useState();

  const [userInfo, setUserInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    set: "",
    house: "",
    password: ""
   
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getFetch(`set/all-set`).then((response) => {
      setAllSets(response?.data);
    });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postFetch("/auth/register", {
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      email: userInfo.email,
      set: userInfo.set,
      house: userInfo.house,
      password: userInfo.password,
      role: "admin",
      status: "active",
    })
      .then((response) => {
        setLoading(false);
        if (!response?.data) {
          toast(response?.response?.data?.error, {
            theme: "dark",
          });
        } else {
          toast("Registration Successful", {
            theme: "dark",
          });
          navigate("/login");
        }
      })
      .catch((error) => {
        setLoading(false);

        toast(error?.response?.data?.error, {
          theme: "dark",
        });
      });
  };
  return (
    <>
      <ToastContainer />
      <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  w-full mt-12">
          <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <h2 className="text-lg font-semibold">
              Fill in form to create your Account
            </h2>
          </div>
          <form
            className="w-11/12 opacity-bg p-6 "
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="flex justify-between">
              <div className="flex flex-col mb-3 w-[48.5%]">
                <label className="text-base text-white mb-1">Firstname</label>
                <input
                  type="text"
                  className="px-3 text-base py-3 rounded-md bg-white border-none"
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      firstname: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex flex-col mb-3 w-[48.5%]">
                <label className="text-base text-white mb-1">Lastname</label>
                <input
                  type="text"
                  className="px-3 text-base py-3 rounded-md bg-white border-none"
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      lastname: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col mb-3">
              <label className="text-base text-white mb-1">Email Address</label>
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

            <div className="flex justify-between gap-3">
              <div className="flex flex-col mb-3 w-full">
                <label className="text-base text-white mb-1">Set</label>
                <div className="pr-3 w-full bg-white rounded-md p-3 flex items-center">
                  <select
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        set: e.target.value,
                      })
                    }
                    className="w-full  text-base  rounded-md bg-white border-none outline-none"
                  >
                    <option>Choose your Set</option>
                    {allSets?.map((item) => (
                      <option key={item._id} value={item.set}>
                        {item.set}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col mb-3 w-full">
                <label className="text-base text-white mb-1">House</label>
                <div className="pr-3 w-full bg-white rounded-md p-3 flex items-center">
                  <select
                    onChange={(e) =>
                      setUserInfo({
                        ...userInfo,
                        house: e.target.value,
                      })
                    }
                    className="w-full  text-base rounded-md bg-white border-none outline-none"
                  >
                    <option>Choose your House</option>
                    <option value="Pink">Pink</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col mb-3">
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
            <div className="py-2 rounded-md mt-4 bg-[#1560bd] flex items-center w-full justify-center">
              {loading ? (
                <p className="text-base m-0 text-white ">
                  Loading...
                </p>
              ) : (
                <button className="text-base m-0 text-white ">Register</button>
              )}
            </div>

            <div className="flex justify-between mt-4">
              <Link to="/login" className="text-base text-white">
                Login
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

export default AdminSignup;
