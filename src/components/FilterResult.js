import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getFetch } from "../apiCalls";
import { setAllUsers } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setViewFilteredResult } from "../slices/modalSlice";
const FilterResult = ({ filteredUsers }) => {
  const dispatch = useDispatch();
  const { viewFilteredResult } = useSelector((state) => state.modal);

  function closeModal() {
    dispatch(setViewFilteredResult(false));
  }

  useEffect(() => {
    getFetch("user/get-all-user").then((response) => {
      dispatch(setAllUsers(response?.data));
    });
  }, []);

  // const handleFilterResult = () => {
  //   dispatch(setViewFilteredResult(true));
  // };

  // const navigate = useNavigate();

  return (
    <>
      <Transition appear show={viewFilteredResult} as={Fragment}>
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
                  <div className="max-h-[500px] overflow-y-scroll">
                    {filteredUsers?.map((filteredUser, i) => {
                      return (
                        <Link to={`/user-profile/${filteredUser?._id}`}>
                          <div
                            className="flex items-center gap-2 mt-4"
                            onClick={() => closeModal()}
                            key={i}
                          >
                            <img
                              src={
                                filteredUser?.profilePic || "/background.jpg"
                              }
                              className="w-[50px] rounded-full h-[50px] object-cover"
                              alt="Background"
                            />
                            <div>
                              <h4 className="font-semibold text-lg">
                                {filteredUser?.firstname +
                                  " " +
                                  filteredUser?.lastname}
                              </h4>
                              <p>{filteredUser?.set} Set</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="flex justify-end mt-5 border-t border-gray-600 pt-3">
                    <button
                      className="py-1 px-3 rounded-lg border  border-black"
                      onClick={() => closeModal()}
                    >
                      Close Modal
                    </button>
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

export default FilterResult;
