import React from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const Conversations = () => {
  return (
    <div>
      <div className="fixed w-full h-screen bg-gray-900 px-6 py-2">
        <br/>
        <br/>
        <br/>
        <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
          <FiSearch className="text-2xl text-white"/>
          <input className="bg-transparent w-full outline-none text-white" placeholder="Search Alumnus"/>
        </div>

        <Link to="/messages">
        <div className="flex items-center gap-3 mt-6  pb-4 border-b-gray-400 border-b">
          <img
            src={"/background.jpg"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt="Background"
          />
          <div className="flex flex-col  w-full">
            <div className="flex justify-between">
              <h4 className="text-white text-xl font-semibold">Tolulope Akunniyi</h4>
              <p className="text-white">12:01 am</p>
            </div>

            <div className="flex justify-between">
              <p className="text-white">Our Last Chat</p>
              <div className="bg-[#1560bd] p-2 rounded-full h-6 w-6 flex items-center justify-center">
                <h4 className="text-white text-md font-semibold">2</h4>
              </div>
            </div>
          </div>
        </div>
        </Link>

        <div className="flex items-center gap-3 mt-4 pb-4 border-b-gray-400 border-b">
          <img
            src={"/background.jpg"}
            className="w-[60px] h-[60px] rounded-full object-cover"
            alt="Background"
          />
          <div className="flex flex-col  w-full">
            <div className="flex justify-between">
              <h4 className="text-white text-xl font-semibold">Tolulope Akunniyi</h4>
              <p className="text-white">12:01 am</p>
            </div>

            <div className="flex justify-between">
              <p className="text-white">Our Last Chat</p>
              <div className="bg-[#1560bd] p-2 rounded-full h-6 w-6 flex items-center justify-center">
                <h4 className="text-white text-md font-semibold">2</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
