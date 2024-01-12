import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";

import { putFetch } from "../apiCalls";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const AboutModal = ({ setUserInfo, userInfo, aboutModal, setAboutModal }) => {
  const dispatch = useDispatch();
 
  function closeModal() {
    setAboutModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putFetch(`/user/update-single-user/${userInfo?._id}`, {
      bio: userInfo.bio,
    }).then((response) => {
      if (response?.status === 200) {
        // navigate("/profile");
        dispatch(setUser(response?.data));

        closeModal()
      } else {
        // navigate("/login");
      }
    });
  };
  
  return (
    <>
      <Transition appear show={aboutModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="p-3">
                      <h4 className="font-normal text-lg mb-4">
                        Tell us more about Yourself
                      </h4>
                      <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="flex flex-col gap-5"
                      >
                        <textarea
                          value={userInfo?.bio}
                          rows={8}
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              bio: e.target.value,
                            })
                          }
                          className="outline-none p-2 border border-gray-600 rounded-md"
                        />
                        <button className="bg-[#1560bd] text-white outline-none border-none py-2 rounded-md">
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>

                 
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AboutModal;
