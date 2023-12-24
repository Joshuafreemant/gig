import React from "react";
import { MdCameraAlt } from "react-icons/md";
import { ImPencil2 } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Profile = () => {
  return (
    <>
      <div className="bg-profile h-[20vh] p-6">
        <Link to="/profile">
          <IoMdArrowBack className="text-white text-xl" />
        </Link>
      </div>
      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="overflow-clip rounded-full absolute -top-[55px] left-4  h-[120px] w-[120px]">
          <img
            src={"/background.jpg"}
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        <div className="absolute left-[110px] top-8 bg-gray-100 p-1 rounded-full">
          <MdCameraAlt className="text-md" />
        </div>

        <div className="absolute right-[10px] top-4  p-1 rounded-full">
          {/* <ImPencil2 className="text-xl text-white" /> */}
          <Link to="/chat">
            <IoChatboxEllipses className="text-xl text-white" />
          </Link>
        </div>

        <div className="flex  text-black min-w-[200px] text-lg font-semibold mt-16 mb-2">
          <h2 className="m-0 border border-gray-300 rounded-md px-2 bg-blue-200">
            Tolulope Akinniyi
          </h2>
        </div>
        <div className="flex gap-1 flex-col">
          <h6 className="text-white">MERN STACK Software Developer</h6>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-white" />
            <p className="text-white">Akobo Ibadan, Oyo State</p>
          </div>
          <h6 className="text-white">@JoshFreeman</h6>
        </div>
      </div>
      <div className="bg-blue-900 h-4 w-full border-none -mt-1"></div>

      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">About</h4>
          <ImPencil2 className="text-md text-white" />
        </div>

        <p className="mt-4 text-white">
          As a web and mobile developer, I am passionate about building modern,
          responsive, and user-friendly applications that run seamlessly across
          multiple devices and platforms
        </p>
      </div>
      <div className="bg-blue-900 h-4 w-full border-none -mt-1"></div>

      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Profession</h4>
          <ImPencil2 className="text-md text-white" />
        </div>

        <div className="flex flex-col gap-3">
          <p className="mt-6 text-white text-md mb-6">
            What is your profession
          </p>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Building Construction</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Financial Services</h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Army</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Entertainment</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Government</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Education</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Civil Service</h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Health Services</h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Law</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Media News</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Technology Industry</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Oil & Gas</h6>
          </div>

          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Real Estate / Construction</h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">
              Manufacturing/Fast moving consumer goods
            </h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Human Resources</h6>
          </div>
          <div className="flex items-center gap-4 ">
            <input type="radio" className="p-2" />
            <h6 className="text-white">Agriculture</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
