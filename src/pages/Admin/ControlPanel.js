import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFetch, postFetch } from "../../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setAdminUsers, setUser } from "../../slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Space, Table, Tag } from "antd";
import { columns } from "./TableColumns";
import ControlModal from "../../components/ControlModal";

const ControlPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { allUsers, user } = useSelector((state) => state.user);

  useEffect(() => {
    getFetch(`user/get-all-users?set=${user?.set}`).then((response) => {
      dispatch(setAdminUsers(response?.data));
      setUsers(response?.data);
    });
  }, [allUsers, currentUser]);

  const OpenModal = (data) => {
    setIsOpen(true);
    setCurrentUser(data);
  };
  const handleallUsers = (e) => {
    e.preventDefault();
    getFetch(`user/get-all-user`).then((response) => {
      dispatch(setAdminUsers(response?.data));
      setUsers(response?.data);
    });
  };
  const handleMyUsers = (e) => {
    e.preventDefault();
    getFetch(`user/get-all-users?set=${user?.set}`).then((response) => {
      dispatch(setAdminUsers(response?.data));
      setUsers(response?.data);
    });
  };

  const columns = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <>
          {!record?.profilePic ? (
            <div className="bg-blue-900 h-[35px] w-[35px] rounded-full flex items-center justify-center">
              <h1 className=" text-white font-semibold text-lg">
                {record?.firstname.charAt(0)}
              </h1>
            </div>
          ) : (
            <div className="bg-gray-500 h-[40px] w-[40px] rounded-full overflow-hidden">
              <img src={record?.profilePic} className="w-full h-full" />
              
            </div>
          )}
        </>
      ),
    },
    {
      title: "Fullname",
      dataIndex: "firstname",
      key: "firstname",
      render: (text, record) => (
        <Link to={`/user-profile/${record?._id}`}>
          <div className="">
            <p>{record.firstname + " " + record.lastname}</p>
          </div>
        </Link>
      ),
    },
    {
      title: "House",
      dataIndex: "house",
      key: "house",
    },

    {
      title: "Set",
      dataIndex: "set",
      key: "set",
    },

    {
      title: "Status",
      key: "status",
      render: (text, record) => (
        <>
          {!record?.status.length || record?.status === "inactive" ? (
            <div
              onClick={() => OpenModal(record)}
              className="flex items-center justify-center bg-red-600 rounded-sm p-1"
            >
              <p className="m-0 text-white font-semibold  text-xs">Inactive</p>
            </div>
          ) : (
            <div
              // onClick={() => OpenModal(record)}
              className="flex items-center justify-center bg-green-600 rounded-sm p-1"
            >
              <p className=" m-0 text-white font-semibold  text-xs">Active</p>
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      <ToastContainer />

      <div className="flex justify-between px-4 items-center mt-24">
        <div className="flex items-center gap-2  ">
          <button
            className="bg-green-700  text-white rounded py-1 px-2"
            onClick={(e) => handleallUsers(e)}
          >
            View All Sets
          </button>
          <button
            onClick={(e) => handleMyUsers(e)}
            className="bg-blue-800  text-white rounded py-1 px-2"
          >
            View My Sets
          </button>
        </div>

        <div className="flex items-center">
          <button
            className="bg-blue-800  text-white rounded py-1 px-2"
            onClick={(e) => navigate("/sets")}
          >
            Add/Delete Set
          </button>

         
         
        </div>
      </div>

      <div className="mt-8">
        <Table columns={columns} dataSource={users} />;
      </div>
      <ControlModal isOpen={isOpen} setIsOpen={setIsOpen} user={currentUser} />
    </>
  );
};

export default ControlPanel;
