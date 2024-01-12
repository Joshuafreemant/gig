import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoChatboxEllipses } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import { postFetch } from "../apiCalls";
import FilterModal from "./FilterModal";
import FilterResult from "./FilterResult";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";

const Navbar = () => {
  let location = useLocation();
  const { user } = useSelector((state) => state.user);
  const userId = user?._id;
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  let [isResultOpen, setIsResultOpen] = useState(false);

  function closeModal() {
    setIsOpen((prev) => !prev);
  }
  function closeResultModal() {
    setIsResultOpen((prev) => !prev);
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
    openResultModal(true);
  };

  useEffect(() => {
    closeModal();
  }, []);

  const closeModals = () => {
    closeModal();
    closeResultModal();
  };

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    postFetch("/auth/logout", "").then((response) => {
      dispatch(setUser({}));
      navigate("/login");
    });
  };
  let [filterModal, setFilterModal] = useState(false);
  let [filteredUsers, setFilteredUsers] = useState();
  let [tot, setTot] = useState(0);

  const openFilterModal = () => {
    setFilterModal(true);
  };

  const totalMessage =
    Number(localStorage.getItem("messageCount")) +
    Number(localStorage.getItem("conversationCount"));
  useEffect(() => {
    setTot(totalMessage)
  }, [totalMessage]);

 
  console.log(totalMessage)
  return (
    <>
      <FilterModal
        setFilteredUsers={setFilteredUsers}
        filteredUsers={filteredUsers}
        filterModal={filterModal}
        setFilterModal={setFilterModal}
      />
      <FilterResult
        setFilteredUsers={setFilteredUsers}
        filteredUsers={filteredUsers}
      />
      {userId ? (
        <div className="bg-blue-900  w-full fixed top-0 z-10 flex items-center justify-between p-5">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center"
              onClick={() => openFilterModal()}
            >
              <FiSearch className="text-white text-2xl" />
            </div>
            <Link to="/conversations">
              <div className="relative ">
                <IoChatboxEllipses className="text-2xl text-white" />
                {tot > 0 ? (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center font-semibold text-white bg-red-600 h-3 w-3 rounded-full"></span>
                ) : (
                  ""
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/profile">
              <FaUserCircle className="text-white text-2xl" />
            </Link>

            <IoIosLogOut
              onClick={(e) => {
                handleLogout(e);
              }}
              className="text-white text-2xl font-semibold"
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Navbar;
