import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import { GoSmiley } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import { Link } from "react-router-dom";
const Messages = () => {
  return (
    <div className="">
      <div className="fixed w-full h-16 top-12 z-10 bg-gray-900 flex justify-between items-center px-6 py-2">
        <Link to="/profile">
        
        <IoMdArrowBack className="text-white text-xl" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px]  rounded-full overflow-hidden">
            <img src="/background.jpg" className="h-full w-full object-fit" />
          </div>
          <h2 className="text-white text-xl font-semibold">
            Tolulope Akinniyi
          </h2>
        </div>
      </div>
      <div className="top-[7rem] fixed bg-doodle h-screen w-full px-4">
        <div className="relative mt-6 pb-6">

        <p className="bg-[#1560bd] text-white w-1/2 px-3 py-2 absolute right-0 top-20 reciever">Hello, How are you doing?</p>
        <p className="bg-[#1560bd] text-white w-1/2 px-3 py-2 absolute left-0 sender">Hello, How are you doing?</p>
        </div>
      </div>
      <div className="fixed bottom-4 px-2 flex items-center w-full">
        <div className=" bg-gray-900 rounded-3xl flex w-11/12 gap-3 px-3 py-1 items-center">
          <GoSmiley className="text-white text-2xl" />
          <textarea
            className="w-11/12 bg-transparent text-white text-lg outline-none border-none py-2"
            rows={1}
            cols={1}
          />
          <img src="/attach.png" />
        </div>
        <div className="bg-[#1560bd] p-3 rounded-full">
        <LuSend className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Messages;
