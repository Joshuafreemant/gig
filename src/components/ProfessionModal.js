import React, { useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";

import { putFetch } from "../apiCalls";
import { useDispatch } from "react-redux";
import { setUser } from "../slices/userSlice";

const ProfessionModal = ({
  setUserInfo,
  userInfo,
  professionModal,
  setProfessionModal,
}) => {
  const dispatch = useDispatch();

  function closeModal() {
    setProfessionModal(false);
  }

  const [selectedProfession, setSelectedProfession] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putFetch(`/user/update-single-user/${userInfo?._id}`, {
      profession: userInfo.profession,
    }).then((response) => {
      if (response?.status === 200) {
        // navigate("/profile");
        dispatch(setUser(response?.data));
        closeModal();
      } else {
        // navigate("/login");
      }
    });
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

  const handleProfessionChange = (event) => {
    setSelectedProfession(event.target.value);
    setUserInfo({
      ...userInfo,
      profession: event.target.value,
    });
  };

  return (
    <>
      <Transition appear show={professionModal} as={Fragment}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white  text-left align-middle shadow-xl transition-all">
                  <div className="">
                    <div className="">
                      <form onSubmit={handleSubmit}>
                        <div className="px-7 pb-6 flex flex-col gap-3 h-[50vh] overflow-scroll">
                          <p className="mt-6 text-black text-xl mb-3">
                            What is your profession
                          </p>

                          {/* Map over your professions array or list */}
                          {Professions?.map((profession, i) => (
                            <div key={i} className="flex items-center gap-4">
                              <input
                                type="radio"
                                className="p-2 outline-none"
                                id={profession}
                                name="profession"
                                value={profession}
                                checked={
                                  selectedProfession === profession ||
                                  userInfo?.profession === profession
                                }
                                onChange={handleProfessionChange}
                              />
                              <label
                                htmlFor={profession}
                                className="text-black"
                              >
                                {profession}
                              </label>
                            </div>
                          ))}
                        </div>

                        <div className="bg-white shadow-xl border-t border-gray-300 py-4 px-7">
                          <button className="w-full bg-[#1560bd] text-white outline-none border-none py-2 rounded-md">
                            Update Profile
                          </button>
                        </div>
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

export default ProfessionModal;
