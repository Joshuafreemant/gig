import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetch } from "../apiCalls";
import { format } from "timeago.js";
import { setChatCount } from "../slices/chatSlice";

const GroupConversationsComponent = ({ conversation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;

  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    getFetch(`/user/get-single-user/${conversation?.sender}`).then(
      (response) => {
        setUserInfo(response?.data);
      }
    );
  }, [conversation?.sender]);

  return (
    <div className="">
      <div className="relative mb-3">
        {conversation.text.includes("res.cloudinary.com") ? (
          <div
            className={
              conversation?.sender === user?._id
                ? " ml-[52%] relative sender bg-[#1560bd] text-white w-[45%]  px-3  pt-2 pb-5  "
                : " relative bg-[#1560bd] text-white w-[45%] px-3  pt-2 pb-5  receiver"
            }
          >
            <img src={conversation.text} className="w-full" />
           
            <span className="absolute right-2 bottom-1 text-[9px]">{format(conversation?.createdAt)}</span> 

          </div>
        ) : (
          <div>
            <p
              className={
                conversation?.sender === user?._id
                  ? "relative ml-[52%] sender bg-[#1560bd] text-white w-[45%]  px-3 pt-2 pb-5  "
                  : "relative bg-[#1560bd] text-white w-[45%] px-3 pt-2 pb-5   receiver"
              }
            >
              {userId === conversation?.sender
                ? ""
                : userInfo?.firstname + " " + userInfo?.lastname + " : "}
              {conversation?.text}
             <span className="absolute right-2 bottom-1 text-[9px]">{format(conversation?.createdAt)}</span> 
            </p>
          
          </div>
        )}
         <div 
                 
                 className={ conversation?.sender === user?._id?"absolute top-[4px] right-2 h-3 w-3 transform rotate-[45deg] bg-[#1560bd]":
                 "absolute top-[5px] -left-1 h-3 w-3 transform rotate-[45deg] bg-[#1560bd]"
                 }></div>
      </div>
    </div>
  );
};

export default GroupConversationsComponent;
