import React, { useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";

import { postFetch } from "../apiCalls";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";
import { setSets } from "../slices/setSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SetModal = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  const [set, setSet] = useState("");
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await postFetch(`/set/new-set`, {
      set: set,
    }).then((response) => {
      if (response?.status === 201) {
        toast(response?.data?.message, {
          theme: "dark",
        });
        dispatch(setSets(response?.data?.data));

        closeModal();
      } else {
        // navigate("/login");
        toast(response?.response?.data?.error, {
          theme: "dark",
        });
      }
    });
  };
  return (
    <>
      <ToastContainer />
      <Transition appear show={isOpen} as={Fragment}>
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
                    <form
                      className="w-full p-6 "
                      onSubmit={(e) => handleSubmit(e)}
                    >
                      <div className="flex justify-between">
                        <div className="flex flex-col mb-3 w-full">
                          <label className="text-base text-black mb-1">
                            Set E.g '1991-2011'
                          </label>
                          <input
                            type="text"
                            className="outline-none px-3 text-base py-3 border border-gray-600 rounded-md bg-white"
                            onChange={(e) => setSet(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="py-2 rounded-md mt-4 bg-[#1560bd] flex items-center w-full justify-center">
                        <button className="text-base m-0 text-white ">
                          Add Set
                        </button>
                      </div>
                    </form>
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

export default SetModal;
