import React, { useEffect, useRef, useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { ImPencil2 } from "react-icons/im";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { getFetch, putFetch } from "../apiCalls";
import Modal from "../components/Modal";
import AboutModal from "../components/AboutModal";
import ProfessionModal from "../components/ProfessionModal";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../slices/userSlice";
import { upload } from "../upload";

const Profile = () => {
  let [userInfo, setUserInfo] = useState(null);
  let [imagePrev, setImagePrev] = useState(userInfo?.profilePic || '/avatar.jpg');

  let [imageFile, setImageFile] = useState();
  const imageRef = useRef(null);
  let [infoModal, setInfoModal] = useState(false);
  let [aboutModal, setAboutModal] = useState(false);
  let [professionModal, setProfessionModal] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  useEffect(() => {
    getFetch(`/user/get-single-user/${userId}`).then((response) => {
      setUserInfo(response?.data);
      setImagePrev(response?.data?.profilePic);
    });
  }, []);

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

  
 
  const onChange = (event) => {
    const file = event.target.files;
    if (file != null) {
      setImageFile(file);
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target != null) {
          setImagePrev(e.target.result);
        }
      };
      reader.readAsDataURL(file[0]);
      upload(file[0])
        .then((response) => {
          if (response) {
            putFetch(`/user/update-single-user/${userId}`, {
              profilePic: response,
            }).then((response) => {
              if (response?.status === 200) {
                dispatch(setUser(response?.data));
              } else {
              }
            });
          }
        })
        .catch((error) => {});
    }
  };

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
        <div className="overflow-hidden rounded-full absolute -top-[40px] left-4  h-[100px] w-[100px]">
         {
          imagePrev?<img
            src={imagePrev}
            className="w-full h-full object-cover bg-gray-50"
            alt=""
          />:
          <div className="overflow-hidden w-[100px] h-[100px] object-cover bg-gray-50 flex items-center justify-center">

            <h1 className="text-[#1560bd] text-4xl font-semibold">{userInfo?.firstname.charAt(0)}</h1>
          </div>
         } 
        </div>
        <div className="absolute left-[93px] top-7 bg-gray-100 p-1 rounded-full">
          <MdCameraAlt
            className="text-md"
            onClick={() => imageRef.current.click()}
          />
        </div>

        <div className="absolute right-[10px] top-4  p-1 rounded-full">
          {userId === userInfo?._id ? (
            <ImPencil2
              className="text-xl text-white"
              onClick={() => openModal()}
            />
          ) : (
            <Link to="/chat">
              <IoChatboxEllipses className="text-xl text-white" />
            </Link>
          )}
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
          <ImPencil2
            className="text-md text-white"
            onClick={() => setAboutModal(true)}
          />
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

          <ImPencil2
            onClick={() => setProfessionModal(true)}
            className="text-md text-white"
          />
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

      <input
        type="file"
        style={{ display: "none" }}
        ref={imageRef}
        accept="image/*"
        onChange={onChange}
      />
    </>
  );
};

export default Profile;
