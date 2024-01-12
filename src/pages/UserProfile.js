import React, { useEffect, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { ImPencil2 } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { getFetch } from "../apiCalls";
import Modal from "../components/Modal";
import AboutModal from "../components/AboutModal";
import ProfessionModal from "../components/ProfessionModal";
import { useSelector } from "react-redux";

const UserProfile = () => {
  let [userInfo, setUserInfo] = useState(null);
  let [infoModal, setInfoModal] = useState(false);
  let [aboutModal, setAboutModal] = useState(false);
  let [professionModal, setProfessionModal] = useState(false);

  const {user} = useSelector((state) => state.user);
  const senderId = user?._id;
  const {id} = useParams();
  useEffect(() => {
    getFetch(`/user/get-single-user/${id}`).then((response) => {
      setUserInfo(response.data);
    });
  }, [id]);

 
  const openModal = () => {
    setInfoModal(true);
  };
  const Professions = [
    "Construction",
    "Finance",
    "Army",
    "Entertainment",
    "Government",
    "Education",
    "Civil Service",
    "Health Services",
    "Law",
    "Media News",
    "Technology",
    "Oil & Gas",
    "Manufacturing",
    "Human Resources",
    "Agriculture",
  ];

  return (
    <>
      <Modal
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        infoModal={infoModal}
        setInfoModal={setInfoModal}
      />
      <AboutModal
        aboutModal={aboutModal}
        setAboutModal={setAboutModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <ProfessionModal
        professionModal={professionModal}
        setProfessionModal={setProfessionModal}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />

      <div className="bg-profile h-[20vh] p-6">
        <Link to="/profile">
          <IoMdArrowBack className="text-white text-xl" />
        </Link>
      </div>
      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="overflow-clip rounded-full absolute -top-[40px] left-4  h-[100px] w-[100px]">
          <img
            src={
              userInfo?.profilePic || "/avatar.jpg"
            }
            className="w-full h-full object-cover"
            alt="Background"
          />
        </div>
        

        <div className="absolute right-[10px] top-4  p-1 rounded-full">
         
            <Link to={`/messages/${senderId}/${id}`}>
              <IoChatboxEllipses className="text-xl text-white" />
            </Link>
          
        </div>

        <div className="flex  text-black min-w-[200px] text-lg font-semibold mt-16 mb-2">
          <h2 className="m-0 border border-gray-300 rounded-md px-2 bg-blue-200">
            {userInfo?.firstname + " " + userInfo?.lastname}
          </h2>
        </div>
        <div className="flex gap-1 flex-col">
          <h6 className="text-white">
            {userInfo?.set + " Set" + " " + userInfo?.house + " House"}
          </h6>
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-white" />
            <p className="text-white">
              {userInfo?.state + ", " + userInfo?.country}
            </p>
          </div>
          <h6 className="text-white">
            @{userInfo?.firstname + userInfo?.lastname}
          </h6>
        </div>
      </div>
      <div className="bg-blue-900 h-4 w-full border-none -mt-1"></div>

      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">About</h4>
          
        </div>

        <p className="mt-4 text-white">
          {userInfo?.bio.length > 2
            ? userInfo?.bio
            : "Click the edit icon and tell us about yourself"}
        </p>
      </div>
      <div className="bg-blue-900 h-4 w-full border-none -mt-1"></div>

      <div className="bg-[#1560bd] p-6 relative -mt-1">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold text-white">Profession</h4>

         
        </div>

        <div className="flex flex-col gap-3">
          <p className="mt-6 text-white text-md mb-6">
            What is your profession
          </p>

          {Professions?.map((profession, i) => (
            <div key={i} className="flex items-center gap-4">
              <input
                type="radio"
                className="p-2"
                id={profession}
                name="profession"
                value={userInfo?.profession}
                checked={userInfo?.profession === profession}
              />
              <label htmlFor={profession} className="text-white">
                {profession}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
