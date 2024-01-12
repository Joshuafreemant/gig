import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { GoSmiley } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { getFetch, postFetch } from "../apiCalls";
import { setChatCount } from "../slices/chatSlice";
import { useDispatch } from "react-redux";
import InputEmoji from "react-input-emoji";
import axios from "axios";
// import { io } from "socket.io-client";
import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { upload } from "../upload";

const Messages = () => {
  // const socket = useRef();
  const dispatch = useDispatch();

  const { senderId, receiverId } = useParams();
  let [userInfo, setUserInfo] = useState(null);
  let [textMessage, setTextMessage] = useState("");
  let [conversationId, setConversationId] = useState("");
  let [messages, setMessages] = useState([]);
  const imageRef = useRef(null);
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    dispatch(setChatCount(messages?.length));
  }, [messages]);

  let [conversations, setConversations] = useState([]);
  let [isSequenceExists, setIsSequenceExists] = useState();

  let conversationMembers = conversations?.map((convo) => convo?.members);
  const memberIdsToCheck = [senderId, receiverId];

  const sequenceExists = conversationMembers?.some((subarray) =>
    memberIdsToCheck.every((id, index) => subarray[index] === id)
  );
  useEffect(() => {
    setIsSequenceExists(sequenceExists);
  }, [sequenceExists]);

  // get the conversation id of two previous chaters
  const filteredObjects = conversations?.filter((obj) =>
    obj.members.every((member) => memberIdsToCheck.includes(member))
  );

  const onChange = (event) => {
    const file = event.target.files;
    if (file != null) {
      let reader = new FileReader();

      reader.readAsDataURL(file[0]);
      upload(file[0], handleSendMessage || handleSendMessageWithConversation);
    }
  };

  let responses;

  useEffect(() => {
    if (
      filteredObjects &&
      filteredObjects.length > 0 &&
      filteredObjects[0]._id
    ) {
      getFetch(`/messages/${filteredObjects[0]._id}`).then((response) => {
        setMessages(response?.data);
        setIsSequenceExists(true);
      });
    }
  }, [filteredObjects?.[0]?._id, conversations, senderId, receiverId]);

  useEffect(() => {
    getFetch(`/conversations/${senderId}`).then((response) => {
      setConversations(response?.data);
      responses = response.data;
    });
  }, [senderId, sequenceExists, responses]);

  useEffect(() => {
    getFetch(`/user/get-single-user/${receiverId}`).then((response) => {
      setUserInfo(response?.data);
    });
  }, [receiverId]);

  // useEffect(() => {
  //   socket.current = io("ws://localhost:8900");
  //   socket.current.on("getMessage", (data) => {
  //     setArrivalMessages({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, [conversations]);

  // useEffect(() => {
  //   arrivalMessages && setMessages((prev) => [...prev, arrivalMessages]);
  // }, [arrivalMessages]);

  // useEffect(() => {
  //   socket.current.emit("addUser", senderId);
  //   // socket.current.on("getUsers", (users) => {
  //   //   setOnlineUsers(
  //   //     user.followings.filter((f) => users.some((u) => u.userId === f))
  //   //   );
  //   // });
  // }, [senderId]);

  const handleSendMessage = (url) => {
    // if (!textMessage.length) return;

    postFetch("/messages", {
      conversationId: filteredObjects?.[0]?._id || conversationId,
      sender: senderId,
      text: url ? url : textMessage,
    }).then((response) => {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });

      // socket.current.emit("sendMessage", {
      //   senderId: senderId,
      //   receiverId,
      //   text: textMessage,
      // });
      // navigate("/login");
      // socket.emit("message", { text: textMessage });

      setMessages(response?.data?.chats);

      setTextMessage("");
    });
  };

  const handleSendMessageWithConversation = (url) => {
    postFetch("/conversations", {
      senderId,
      receiverId,
    }).then((response) => {
      setConversationId(response?.data?._id);
      postFetch("/messages", {
        conversationId: response?.data?._id,
        sender: senderId,
        text: url ? url : textMessage,
      }).then((response) => {
        setMessages(response?.data?.chats);
        setIsSequenceExists(true);
        setTextMessage("");
      });
    });
  };
  function handleOnEnter(text) {
    setTextMessage(text);
    handleSendMessage();
  }
  return (
    <>
      <ToastContainer />
      <div className="">
        <div className="fixed w-full h-16 top-16 z-10 bg-gray-900 flex justify-between items-center px-6 py-2">
          <Link to="/conversations">
            <IoMdArrowBack className="text-white text-xl" />
          </Link>
          <Link to={`/user-profile/${userInfo?._id}`}>
            <div className="flex items-center gap-2">
              <div className="w-[35px] h-[35px]  rounded-full overflow-hidden">
                <img
                  src={userInfo?.profilePic || "/background.jpg"}
                  className="h-full w-full object-fit"
                />
              </div>
              <h2 className="text-white text-xl font-semibold">
                {userInfo?.firstname + " " + userInfo?.lastname}
              </h2>
            </div>
          </Link>
        </div>
        <div className="pt-24 top-[4rem] fixed bg-doodle h-[80vh] w-full px-4  overflow-y-scroll pb-[140px]">
          <div className="">
            {messages?.map((message, i) => {
              return (
                <div className="relative  mb-3 " ref={scrollRef}>
                  {message?.text?.includes("res.cloudinary.com") ? (
                    <div
                      className={
                        message?.sender === senderId
                          ? "relative ml-[52%] sender  text-white w-[45%] bg-[#1560bd] px-1 pt-4 pb-5"
                          : "relative  bg-[#1560bd] text-white w-[45%] px-1 pt-4 pb-5  receiver"
                      }
                    >
                      <img src={message?.text} />
                      <p className="text-[9px] ml-[55%] absolute bottom-1 right-2">
                        {format(message?.createdAt)}
                      </p>
                    </div>
                  ) : (
                    <div
                      key={i}
                      className={
                        message?.sender === senderId
                          ? "relative ml-[52%] sender flex flex-col gap-1 bg-[#1560bd] text-white w-[45%] px-3 pt-2 pb-5"
                          : "relative bg-[#1560bd] flex flex-col gap-1 text-white w-[45%] px-3 pt-2 pb-5  receiver"
                      }
                    >
                      <p>{message?.text}</p>
                      <p className="text-[9px] right-2 bottom-1 absolute">
                        {format(message?.createdAt)}
                      </p>
                    </div>
                  )}
                  <div
                    className={
                      message?.sender === senderId
                        ? "absolute top-[4px] right-2 h-3 w-3 transform rotate-[45deg] bg-[#1560bd]"
                        : "absolute top-[5px] -left-1 h-3 w-3 transform rotate-[45deg] bg-[#1560bd]"
                    }
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="fixed bottom-0 px-2 flex items-center w-full bg-blue-900  p-4 gap-2">
          <div className=" bg-gray-900 rounded-3xl flex w-full gap-2 px-3 py-1 items-center">
            <InputEmoji
              value={textMessage}
              onChange={setTextMessage}
              cleanOnEnter
              onEnter={handleOnEnter}
              className="w-11/12 text-white text-lg outline-none border-none py-2"
              placeholder="Type a message"
            />
            <img
              onClick={() => imageRef.current.click()}
              src="/attach.png"
              className="w-[25px]"
            />
          </div>

          {!isSequenceExists ? (
            <div
              onClick={(e) => handleSendMessageWithConversation(e)}
              className="bg-[#1560bd] p-3 rounded-full"
            >
              <LuSend className="" />
            </div>
          ) : (
            <div
              onClick={() => handleSendMessage()}
              className="bg-[#1560bd] p-3 rounded-full"
            >
              <LuSend className="text-white" />
            </div>
          )}
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

export default Messages;
