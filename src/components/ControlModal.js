import React, { useEffect } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import { putFetch } from "../apiCalls";
import { useDispatch } from "react-redux";
import { setAdminUsers, setUser } from "../slices/userSlice";

const ControlModal = ({ user, isOpen, setIsOpen }) => {
  const dispatch = useDispatch();

  function closeModal() {
    setIsOpen((prev) => !prev);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await putFetch(`/user/activate-user/${user?._id}`, {
      status: "active",
    }).then((response) => {
      if (response?.status === 200) {
        // navigate("/profile");
        dispatch(setAdminUsers(response?.data));

        closeModal();
      } else {
        // navigate("/login");
      }
    });
  };
  return (
    <>
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
                    <p className="text-lg">
                      Are You sure you want to activate{" "}
                      {user?.firstname + " " + user?.lastname} ?{" "}
                    </p>

                    <div className="flex items-center gap-3 my-4">
                      <button  onClick={() => closeModal()} className="p-3 rounded-lg border border-black outline-none text-black">
                        Cancel
                      </button>
                      <button
                        onClick={(e) => handleSubmit(e)}
                        className="bg-blue-900 p-3 rounded-lg outline-none text-white"
                      >
                        Activate
                      </button>
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

export default ControlModal;
