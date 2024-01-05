import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { logoutApi } from "../apiCalls";
const Navbar = () => {
  let [isOpen, setIsOpen] = useState(false);
  let [isResultOpen, setIsResultOpen] = useState(false);
  
  function closeModal() {
    setIsOpen(prev=>!prev);
  }
  function closeResultModal() {
    setIsResultOpen(prev=>!prev);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openResultModal() {
    setIsResultOpen(true);
  }


  const classSets = [
    "1987-1992",
    "1988-1993",
    "1989-1994",
    "1990-1995",
    "1991-1996",
    "1992-1997",
    "1993-1998",
    "1994-1999",
    "1995-2000",
    "1996-2001",
    "1997-2002",
    "1998-2003",
    "1999-2004",
    "2000-2005",
    "2001-2006",
    "2002-2007",
    "2003-2008",
    "2004-2009",
    "2005-2010",
    "2006-2011",
    "2007-2012",
    "2008-2013",
    "2009-2014",
    "2010-2015",
    "2011-2016",
    "2012-2017",
    "2013-2018",
    "2014-2019",
    "2015-2020",
    "2016-2021",
    "2017-2022",
    "2018-2023",
  ];
  const Houses = ["Pink", "Yellow", "Red", "Green"];

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

  const [value, setValue] = useState("");
  const [result, setResult] = useState(false);
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  const seeResult = (value) => {
    setResult((prev) => !prev);
    openResultModal(true)
  };

  useEffect(() => {
    closeModal()
  }, [])
  
const closeModals=()=>{
    closeModal()
    closeResultModal()
}

const navigate = useNavigate();


const handleLogout = (e) => {
  e.preventDefault();
  logoutApi("/auth/logout").then((response) => {
    navigate("/login");
  });
};
  return (
    <>
      {!result && (
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
                    <div className="flex items-center bg-gray-700 rounded-xl p-2 gap-2">
                      <FiSearch className="text-2xl text-white" />
                      <input
                        className="bg-transparent w-full outline-none text-white"
                        placeholder="Search Alumnus Name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 justify-between h-[400px] overflow-scroll mt-3">
                      <div className="mt-2">
                        <h4 className="font-semibold text-lg">Class</h4>
                        <div className="overflow-scroll h-[350px] mt-2">
                          {classSets.map((classSet) => (
                            <div className="flex items-center gap-1 ">
                              <input
                                type="checkbox"
                                className="rounded-full p-2 border-gray-800"
                              />{" "}
                              <p>{classSet}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2">
                          <h4 className="font-semibold text-lg">Country</h4>

                          <Select
                            options={options}
                            value={value}
                            onChange={changeHandler}
                          />
                        </div>
                      </div>

                      <div className="mt-2">
                        <h4 className="font-semibold text-lg">House</h4>
                        <div className="overflow-scroll mt-2">
                          {Houses.map((House) => (
                            <div className="flex items-center gap-1 ">
                              <input
                                type="checkbox"
                                className="rounded-full p-2 border-gray-800"
                              />{" "}
                              <p>{House}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-2">
                          <h4 className="font-semibold text-lg">Profession</h4>
                          <div className="overflow-scroll mt-2">
                            {Professions.map((Profession) => (
                              <div className="flex items-center gap-1 ">
                                <input
                                  type="checkbox"
                                  className="rounded-full p-2 border-gray-800"
                                />{" "}
                                <p className="text-sm">{Profession}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 border-t border-gray-600 pt-3">
                      <button
                        onClick={() => seeResult()}
                        className="bg-black py-1 px-3 rounded-lg text-white outine-none"
                      >
                        Search Result (3)
                      </button>
                      <button  className="py-1 px-3 rounded-lg border  border-black">
                        Clear Filter
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}

      {result && (
        <Transition appear show={isResultOpen} as={Fragment}>
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
                      <Link to="/profile">
                        <div className="flex items-center gap-2" onClick={()=>closeModal()}>
                          <img
                            src={"/background.jpg"}
                            className="w-[50px] rounded-full h-[50px] object-cover"
                            alt="Background"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              Tolulope Akinniyi
                            </h4>
                            <p>1990-1995 Set</p>
                          </div>
                        </div>
                      </Link>

                      <Link to="/profile">
                        <div className="flex items-center gap-2 mt-4" onClick={()=>closeModal()}>
                          <img
                            src={"/background.jpg"}
                            className="w-[50px] rounded-full h-[50px] object-cover"
                            alt="Background"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              Tolulope Akinniyi
                            </h4>
                            <p>1990-1995 Set</p>
                          </div>
                        </div>
                      </Link>
                      <Link to="/profile">
                        <div className="flex items-center gap-2 mt-4" onClick={()=>closeModal()}>
                          <img
                            src={"/background.jpg"}
                            className="w-[50px] rounded-full h-[50px] object-cover"
                            alt="Background"
                          />
                          <div>
                            <h4 className="font-semibold text-lg">
                              Tolulope Akinniyi
                            </h4>
                            <p>1990-1995 Set</p>
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="flex justify-end mt-2 border-t border-gray-600 pt-3">
                      <button className="py-1 px-3 rounded-lg border  border-black" onClick={closeModals}>
                        Clear Filter
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}

      <div className="bg-blue-900  w-full fixed top-0 z-10 flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center" onClick={openModal}>
            <FiSearch className="text-white text-2xl" />
          </div>
          <Link to="/conversations">
            <IoChatboxEllipses className="text-2xl text-white" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <FaUserCircle className="text-white text-2xl" />
          </Link>

          <IoIosLogOut onClick={(e)=>{handleLogout(e)}} className="text-white text-2xl font-semibold" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
