import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFetch } from "../apiCalls";
import { format } from "timeago.js";
import ConversationsComponent from "../components/Conversations";
import { setGroupChatCount } from "../slices/chatSlice";
import { MdCameraAlt } from "react-icons/md";
const Conversations = () => {
  const dispatch = useDispatch();

  let [conversations, setConversations] = useState(null);
  let [groupConversations, setGroupConversations] = useState([]);

  let [lastUserInfo, setLastUserInfo] = useState(null);

  const { user } = useSelector((state) => state.user);
  const userId = user?._id;



  useEffect(() => {
    getFetch(`/conversations/${userId}`).then((response) => {
      setConversations(response.data);
    });
  }, [userId]);

  let lastmessageSender = groupConversations[groupConversations?.length - 1];
  useEffect(() => {
    getFetch(`/messages/set/${user?.set}`).then((response) => {
      setGroupConversations(response.data);
    });
  }, []);

  useEffect(() => {
    getFetch(`/user/get-single-user/${lastmessageSender?.sender}`).then(
      (response) => {
        setLastUserInfo(response?.data);
      }
    );
  }, [lastmessageSender]);


  const { groupChatCount } = useSelector((state) => state.chat);
  let conversationCount = groupConversations?.length - groupChatCount;


  localStorage.setItem("conversationCount",conversationCount)

  return (
    <div>
      <div className="fixed w-full h-screen bg-gray-900 px-6 py-2">
        <br />
        <br />
        <br />
        {/* <div className="flex items-center bg-gray-700 rounded-xl p-3 gap-2">
          <FiSearch className="text-2xl text-white" />
          <input
            className="bg-transparent w-full outline-none text-white"
            placeholder="Search Alumnus"
          />
        </div> */}

        <Link
          onClick={() => {
            dispatch(setGroupChatCount(0));
          }}
          to="/group-messages"
        >
          <div className="flex items-center gap-3 mt-6  pb-4 border-b-gray-400 border-b">
            <img
              src={"/avatar.png"}
              className="w-[50px] h-[50px] rounded-full object-cover"
              alt="Background"
            />
            <div className="flex flex-col  w-full gap-1">
              <div className="flex justify-between">
                <h4 className="text-white text-lg font-semibold">
                  {user?.set} Sets
                </h4>
                {lastUserInfo?._id?
                <p className="text-white text-xs">
                  {format(lastmessageSender?.createdAt)}
                </p>:""}
              </div>

              {
                lastUserInfo?._id? <div className="flex justify-between items-center">
                {lastUserInfo?._id === userId ? (
                  <p className="flex items-center">
                   
                    
                    {lastmessageSender?.text.includes("res.cloudinary.com") ? (
                    <p className="text-gray-200 flex items-center gap-1">
                       <span className="text-md font-semibold">You :&nbsp;</span>
                      <MdCameraAlt className="text-gray-200 text-xs" />
                      Photo
                    </p>
                  ) : (
                    <p className="text-gray-200 flex items-center"> <span className="text-md font-semibold">You :&nbsp;</span>{lastmessageSender?.text}</p>
                  )}
                  </p>
                  

                ) : (
                  <p className="text-white">
                    <span className="text-md font-semibold">
                      {lastUserInfo?.firstname +
                        " " +
                        lastUserInfo?.lastname +
                        ":"}
                    </span>
                    &nbsp; &nbsp;
                    

                    {lastmessageSender?.text.includes("res.cloudinary.com") ? (
                    <p className="text-gray-200 flex items-center gap-1">
                       
                      <MdCameraAlt className="text-gray-200 text-xs" />
                      Photo
                    </p>
                  ) : (
                    <p className="text-gray-200 flex items-center"> <span className="text-md font-semibold">You :&nbsp;</span>{lastmessageSender?.text}</p>
                  )}
                  </p>
                )}
                {conversationCount < 1 ? (
                  ""
                ) : (
                  <div className="bg-[#1560bd] p-2 rounded-full h-6 w-6 flex items-center justify-center">
                    <h4 className="text-white text-md font-semibold">
                      {conversationCount}
                    </h4>
                  </div>
                )}
              </div>:""
              }
             
            </div>
          </div>
        </Link>

        <div className="overflow-y-scroll h-[100vh] pb-[150px]">
          {conversations?.map((conversation, i) => {
            return <ConversationsComponent conversation={conversation} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Conversations;
