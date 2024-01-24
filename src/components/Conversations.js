import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetch } from "../apiCalls";
import { format } from "timeago.js";
import { setChatCount } from "../slices/chatSlice";
import { MdCameraAlt } from "react-icons/md";

const ConversationsComponent = ({ conversation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const friendId = conversation.members?.find((m) => m !== userId);
  const [userInfo, setUserInfo] = useState();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    getFetch(`/user/get-single-user/${friendId}`).then((response) => {
      setUserInfo(response?.data);
    });
  }, [friendId]);

  let lastmessageSender = chatInfo[chatInfo?.length - 1];
  useEffect(() => {
    getFetch(`/messages/${conversation._id}`).then((response) => {
      setChatInfo(response?.data);
    });
  }, [lastmessageSender?._id]);

  const { chatCount } = useSelector((state) => state.chat);
  let messageCount = chatInfo?.length - chatCount;

  // useEffect(() => {
    localStorage.setItem("messageCount",messageCount)
  // }, [])
  return (
    <Link
      onClick={() => {
        dispatch(setChatCount(0));
      }}
      to={`/messages/${userId}/${friendId}`}
    >
      <div className="flex items-center gap-3 mt-6  pb-4 border-b-gray-400 border-b">
       
       <div  className="w-[60px] h-[45px] rounded-full overflow-hidden ">
 <img
          src={userInfo?.profilePic || "/avatar.png"}
          className="w-full h-full  object-cover"
          alt="Background"
        />
       </div>
       
        <div className="flex flex-col  w-full">
          <div className="flex justify-between">
            <h4 className="text-white text-lg font-semibold">
              {userInfo?.firstname + " " + userInfo?.lastname}
            </h4>
            <p className="text-white text-xs">
              {format(lastmessageSender?.createdAt)}
            </p>
          </div>

          <div className="flex justify-between">
            {lastmessageSender?.text.includes("res.cloudinary.com") ? (
              <p className="text-gray-200 flex items-center gap-1">
                <MdCameraAlt className="text-gray-200 text-xs" />
                Photo
              </p>
            ) : (
              <p className="text-white">{lastmessageSender?.text}</p>
            )}
            {messageCount < 1 ? (
              ""
            ) : (
              <div className="bg-[#1560bd] p-2 rounded-full h-6 w-6 flex items-center justify-center">
                <h4 className="text-white text-md font-semibold">
                  {messageCount}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConversationsComponent;
