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
import { setUser } from "../slices/userSlice";

const Modal = ({ setUserInfo, userInfo, infoModal, setInfoModal }) => {
  const dispatch = useDispatch();

  function closeModal() {
    setInfoModal(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await putFetch(`/user/update-single-user/${userInfo?._id}`, {
      lastname: userInfo.lastname,
      firstname: userInfo.firstname,
      house: userInfo.house,
      set: userInfo.set,
      state: userInfo.state,
      country: userInfo.country,
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
  return (
    <>
      <Transition appear show={infoModal} as={Fragment}>
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
                        <div className="flex flex-col mb-3 w-[48.5%]">
                          <label className="text-base text-black mb-1">
                            Firstname
                          </label>
                          <input
                            type="text"
                            value={userInfo?.firstname}
                            className="outline-none px-3 text-base py-3 border border-gray-600 rounded-md bg-white"
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                firstname: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-col mb-3 w-[48.5%]">
                          <label className="text-base text-black mb-1">
                            Lastname
                          </label>
                          <input
                            type="text"
                            value={userInfo?.lastname}
                            className="outline-none px-3 text-base py-3 rounded-md bg-white border border-gray-600"
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                lastname: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between w-full ">
                        <div className="flex flex-col mb-3 w-[48.5%]">
                          <label className="text-base text-black mb-1">
                            Country
                          </label>
                          <CountryDropdown
                            value={userInfo?.country}
                            className="border border-gray-600 rounded-md px-2 py-3 outline-none"
                            onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  country: e,
                                })
                              }
                          />
                        </div>

                        <div className="flex flex-col mb-3 w-[48.5%]">
                          <label className="text-base text-black mb-1">
                            State
                          </label>
                          <RegionDropdown
                            country={userInfo?.country}
                            className="border border-gray-600 rounded-md px-2 py-3 outline-none"
                            value={userInfo?.state}
                            onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  state: e,
                                })
                              }
                          />
                        </div>
                      </div>

                      <div className="flex justify-between gap-2 ">
                        <div className="flex flex-col mb-3 w-full">
                          <label className="text-base text-black mb-1">
                            Set
                          </label>
                          <div className="pr-3 w-full bg-white rounded-md border border-gray-600">
                            <select
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  set: e.target.value,
                                })
                              }
                              className="w-full px-3 text-base py-3 rounded-md bg-white  outline-none"
                            >
                              <option>{userInfo?.set}</option>
                              <option value="1987-1992">1987-1992</option>
                              <option value="1988-1993">1988-1993</option>
                              <option value="1989-1994">1989-1994</option>
                              <option value="1990-1995">1990-1995</option>
                              <option value="1991-1996">1991-1996</option>
                              <option value="1992-1997">1992-1997</option>
                              <option value="1993-1998">1993-1998</option>
                              <option value="1994-1999">1994-1999</option>
                              <option value="1995-2000">1995-2000</option>
                              <option value="1996-2001">1996-2001</option>
                              <option value="1997-2002">1997-2002</option>
                              <option value="1998-2003">1998-2003</option>
                              <option value="1999-2004">1999-2004</option>
                              <option value="2000-2005">2000-2005</option>
                              <option value="2001-2006">2001-2006</option>
                              <option value="2002-2007">2002-2007</option>
                              <option value="2003-2008">2003-2008</option>
                              <option value="2004-2009">2004-2009</option>
                              <option value="2005-2010">2005-2010</option>
                              <option value="2006-2011">2006-2011</option>
                              <option value="2007-2012">2007-2012</option>
                              <option value="2008-2013">2008-2013</option>
                              <option value="2009-2014">2009-2014</option>
                              <option value="2010-2015">2010-2015</option>
                              <option value="2011-2016">2011-2016</option>
                              <option value="2012-2017">2012-2017</option>
                              <option value="2013-2018">2013-2018</option>
                              <option value="2014-2019">2014-2019</option>
                              <option value="2015-2020">2015-2020</option>
                              <option value="2016-2021">2016-2021</option>
                              <option value="2017-2022">2017-2022</option>
                              <option value="2018-2023">2018-2023</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col mb-3 w-full">
                          <label className="text-base text-black mb-1">
                            House
                          </label>
                          <div className="pr-3 w-full bg-white rounded-md border border-gray-600">
                            <select
                              onChange={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  house: e.target.value,
                                })
                              }
                              className="w-full px-3 text-base py-3 rounded-md bg-white  outline-none"
                            >
                              <option>{userInfo?.house}</option>
                              <option value="Pink">Pink</option>
                              <option value="Yellow">Yellow</option>
                              <option value="Red">Red</option>
                              <option value="Green">Green</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="py-2 rounded-md mt-4 bg-[#1560bd] flex items-center w-full justify-center">
                        <button className="text-base m-0 text-white ">
                          Update Profile
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

export default Modal;
