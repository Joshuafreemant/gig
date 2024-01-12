import React, { useEffect } from "react";
import { FiSearch } from "react-icons/fi";

import { Link, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getFetch } from "../apiCalls";
import { setAllUsers } from "../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setViewFilteredResult } from "../slices/modalSlice";
const FilterModal = ({ filterModal, setFilterModal,filteredUsers,setFilteredUsers }) => {
  const dispatch = useDispatch();
  const { allUsers,user } = useSelector((state) => state.user);
  const { viewFilteredResult } = useSelector((state) => state.modal);
  let [fullname, setFullname] = useState(null);
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");

  if (viewFilteredResult === true) {
    setFilterModal(false);
  }
  function closeModal() {
    setFilterModal(false);
  }

  useEffect(() => {
    getFetch("user/get-all-user").then((response) => {
      dispatch(setAllUsers(response?.data));
    });
  }, [filterModal]);

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

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };
  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };
  const handleProfessionChange = (event) => {
    setSelectedProfession(event.target.value);
  };

  const changeHandler = (value) => {
    setValue(value);
    
  };

 let filteredAlumni = allUsers?.filter((allUser)=>{
  return allUser?._id !== user?._id
});
  useEffect(() => {
    let filtered = filteredAlumni
    if (fullname) {
      filtered = filtered?.filter(
        (item) =>
          item?.firstname.toLowerCase()?.includes(fullname?.toLowerCase()) ||
          item?.lastname.toLowerCase()?.includes(fullname?.toLowerCase())
      );
    }
    if (selectedClass) {
      filtered = filtered?.filter((item) =>
        item?.set.toLowerCase()?.includes(selectedClass?.toLowerCase())
      );
    }
    if (selectedProfession) {
      filtered = filtered?.filter((item) =>
        item?.profession
          .toLowerCase()
          ?.includes(selectedProfession?.toLowerCase())
      );
    }
    if (selectedHouse) {
      filtered = filtered?.filter((item) =>
        item?.house.toLowerCase()?.includes(selectedHouse?.toLowerCase())
      );
    }

    if (value) {
      filtered = filtered?.filter((item) =>
        item?.country.toLowerCase()?.includes(value?.label?.toLowerCase())
      );
    }
    setFilteredUsers(filtered);
  }, [fullname, selectedClass, selectedProfession, selectedHouse, value]);

  const handleFilterResult = () => {
    dispatch(setViewFilteredResult(true));
  };
  const clearFilter = () => {
    setFilteredUsers(filteredAlumni);
    setFullname("");
    setSelectedClass(null);
    setSelectedProfession(null);
    setSelectedHouse(null);
  };
  const navigate = useNavigate();

  return (
    <>
      <Transition appear show={filterModal} as={Fragment}>
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
                      className="bg-transparent w-full outline-none text-white p-1"
                      placeholder="Search Alumnus Name"
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 justify-between h-[400px] overflow-scroll mt-3">
                    <div className="mt-2">
                      <h4 className="font-semibold text-lg">Class</h4>
                      <div className="overflow-y-scroll h-[350px] mt-2">
                        {classSets.map((classSet,i) => (
                          <div key={i} className="flex items-center gap-1 ">
                            <input
                              type="radio"
                              className="rounded-full p-2 border-gray-800"
                              id={classSet}
                              name="classSet"
                              value={classSet}
                              checked={selectedClass === classSet}
                              onChange={handleClassChange}
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
                      <div className="overflow-y-scroll mt-2">
                        {Houses.map((House, i) => (
                          <div key={i} className="flex items-center gap-1 ">
                            <input
                              type="radio"
                              className="rounded-full p-2 border-gray-800"
                              id={House}
                              name="House"
                              value={House}
                              checked={selectedHouse === House}
                              onChange={handleHouseChange}
                            />{" "}
                            <p>{House}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2">
                        <h4 className="font-semibold text-lg">Profession</h4>
                        <div className="overflow-y-scroll mt-2">
                          {Professions.map((Profession) => (
                            <div className="flex items-center gap-1 ">
                              <input
                                type="radio"
                                className="rounded-full p-2 border-gray-800"
                                id={Profession}
                                name="Profession"
                                value={Profession}
                                checked={selectedProfession === Profession}
                                onChange={handleProfessionChange}
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
                      onClick={() => handleFilterResult()}
                      className="bg-black py-1 px-3 rounded-lg text-white outine-none"
                    >
                      Search Result ({filteredUsers?.length||0})
                    </button>
                    <button
                      onClick={() => clearFilter()}
                      className="py-1 px-3 rounded-lg border  border-black"
                    >
                      Clear Filter
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

export default FilterModal;
