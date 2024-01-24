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
import { MdAdminPanelSettings } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    "1991-1997",
    "1992-1998",
    "1993-1999",
    "1994-2000",
    "1995-2001",
    "1996-2002",
    "1997-2003",
    "1998-2004",
    "1999-2005",
    "2000-2006",
    "2001-2007",
    "2002-2008",
    "2003-2009",
    "2004-2010",
    "2005-2011",
    "2006-2012",
    "2007-2013",
    "2008-2014",
    "2009-2015",
    "2010-2016",
    "2011-2017",
    "2012-2018",
    "2013-2019",
    "2014-2020",
    "2015-2021",
    "2016-2022",
    "2017-2023",
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
  let [filteredUsers, setFilteredUsers] = useState([]);
  let [tot, setTot] = useState(0);

  const openFilterModal = () => {
    setFilterModal(true);
  };

  const totalMessage =
    Number(localStorage.getItem("messageCount")) +
    Number(localStorage.getItem("conversationCount"));
  useEffect(() => {
    setTot(totalMessage);
  }, [totalMessage]);

  
  const alertActivation = () => {
    toast("Your account is yet to be activated, once activated, you will be contacetd by mail", {
      theme: "dark",
    });
  };
  return (
    <>
      <ToastContainer />

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
          {user?.status === "active" ? (
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
          ) : (
            <div onClick={()=>alertActivation()} className="flex items-center gap-2">
              <div className="flex items-center">
                <FiSearch className="text-white text-2xl" />
              </div>
              <div className="relative ">
                <IoChatboxEllipses className="text-2xl text-white" />
                {tot > 0 ? (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center font-semibold text-white bg-red-600 h-3 w-3 rounded-full"></span>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}

          {user?.role === "admin" && (
            <div className="flex items-center gap-4">
              <Link to="/control-panel">
                <MdAdminPanelSettings className="text-white text-2xl" />
              </Link>
            </div>
          )}

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
