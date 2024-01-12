import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { GoSmiley } from "react-icons/go";
import { LuSend } from "react-icons/lu";
import { Link, useParams } from "react-router-dom";
import { getFetch, postFetch } from "../apiCalls";
import { useDispatch, useSelector } from "react-redux";
import InputEmoji from "react-input-emoji";
import GroupConversationsComponent from "../components/GroupMessagesConvo";
import { setGroupChatCount } from "../slices/chatSlice";
import { upload } from "../upload";
const GroupMessages = () => {
  const imageRef = useRef(null);
  const scrollRef = useRef();
  

  let responses;
  const onChange = (event) => {
    const file = event.target.files;
    console.log(file);
    if (file != null) {
      let reader = new FileReader();

      reader.readAsDataURL(file[0]);
      upload(file[0], handleSendMessage);
    }
  };

  const dispatch = useDispatch();
  const [senderProfiles, setSenderProfiles] = useState({});
  const [userInfo, setUserInfo] = useState();

  const { user } = useSelector((state) => state.user);
  let [textMessage, setTextMessage] = useState("");
  let [conversations, setConversations] = useState([]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  useEffect(() => {
    getFetch(`/messages/set/${user?.set}`).then((response) => {
      setConversations(response.data);
      responses = response.data;
      // dispatch(setGroupChatCount(response?.data?.length));
    });
  }, [responses]);

  useEffect(() => {
    dispatch(setGroupChatCount(conversations?.length));
  }, [conversations]);

  const handleSendMessage = (url) => {
    postFetch("/messages/set", {
      sender: user?._id,
      text: url ? url : textMessage,
      set: user?.set,
    }).then((response) => {
      setTextMessage("");
      setConversations(response?.data?.groupChats);
      // dispatch(setGroupChatCount(response?.data?.groupChats?.length));
    });
  };

  useEffect(() => {
    const fetchSenderProfiles = async () => {
      for (const message of conversations) {
        const userId = message?.sender;

        if (userId) {
          getFetch(`/user/get-single-user/${userId}`).then((response) => {
            setUserInfo(response?.data);
          });
        }
      }
    };

    fetchSenderProfiles();
  }, [conversations]);

  function handleOnEnter(text) {
    setTextMessage(text);
    handleSendMessage();
  }
  return (
    <>
      <div className="">
        <div className="fixed w-full h-16 top-16 z-10 bg-gray-900 flex justify-between items-center px-6 py-2">
          <Link to="/conversations">
            <IoMdArrowBack className="text-white text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-[40px] h-[40px]  rounded-full overflow-hidden">
              <img src="/background.jpg" className="h-full w-full object-fit" />
            </div>
            <h2 className="text-white text-lg font-semibold">
              {user?.set + " Sets"}
            </h2>
          </div>
        </div>
        <div className="top-[4rem] pt-24 fixed bg-doodle h-[80vh] w-full px-4  overflow-y-scroll pb-[140px]">
          {conversations?.map((conversation, i) => {
            return (
              <div ref={scrollRef}>
                <GroupConversationsComponent conversation={conversation} />;
              </div>
            );
          })}
        </div>
        <div className="fixed bottom-0 px-2 flex items-center w-full bg-blue-900  p-4 gap-2">
          <div className=" bg-gray-900 rounded-3xl flex w-full items-center pr-3">
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

          <div
            onClick={() => handleSendMessage()}
            className="bg-[#1560bd] p-3 rounded-full"
          >
            <LuSend className="text-white" />
          </div>
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

export default GroupMessages;
