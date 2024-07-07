import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postFetch } from "../apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail } from "../slices/userSlice";

const Token = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const { email:userEmail } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    setLoading(true);
    await postFetch("/auth/verify-otp", {
      email: userEmail,
      otp: otpString,
    }).then((response) => {
      if (response?.status === 200) {
        toast(response?.data?.message, {
          theme: "dark",
        });

        navigate("/reset-password");
        setLoading(false);
      } else {
        // navigate("/forgot-password");
        toast(response?.response?.data.message, {
          theme: "dark",
        });
        setLoading(false);
      }
    });
  };

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("Text");
    if (!/^\d{1,4}$/.test(pasteData)) {
      event.preventDefault();
      return;
    }

    const newOtp = pasteData
      .split("")
      .slice(0, 4)
      .map((digit) => parseInt(digit, 10));
    setOtp(newOtp);

    inputRefs[newOtp.length - 1].current.focus();
  };
  return (
    <>
      <ToastContainer />

      <div className="text-2xl bg-image h-screen w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center  w-full  md:w-4/12">
          <div className="flex text-white flex-col items-center justify-center w-full mb-5 gap-3">
            <h1 className="text-3xl font-bold text-white">Enter OTP?</h1>
            <h2 className="text-lg font-semibold">
              Enter OTP sent to your email for recovery
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="w-11/12 "
          >
            <div className="flex flex-col items-center justify-center ">
              {/* <h1 className="text-xl mb-4">Enter OTP</h1> */}
              <div className="flex">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    className="w-12 h-12 text-center text-xl border rounded-md m-1"
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e)}
                    onPaste={handlePaste}
                  />
                ))}
              </div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-lg"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Token;
