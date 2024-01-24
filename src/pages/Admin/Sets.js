import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFetch, postFetch } from "../../apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setAdminUsers, setUser } from "../../slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Space, Table, Tag } from "antd";

import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteModal from "../../components/DeleteModal";
import { setSets } from "../../slices/setSlice";
import SetModal from "../../components/SetModal";
const Sets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [allSets, setAllSets] = useState(null);
  const [currentSet, setCurrentSet] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { sets } = useSelector((state) => state.set);
  const setLength=sets.length
  useEffect(() => {
    getFetch(`set/all-set`).then((response) => {
      dispatch(setSets(response?.data));
      setAllSets(response?.data);
    });
  }, [setLength,currentSet]);

  const OpenModal = (data) => {
    setIsOpen(true);
    setCurrentSet(data);
  };

  const columns = [
    {
      title: "Set",
      dataIndex: "set",
      key: "set",
      render: (text, record) => (
        <>
          <p className="m-0 text-black font-semibold  text-sm">{record?.set}</p>
        </>
      ),
    },

    {
      title: "Action",
      key: "",
      render: (text, record) => (
        <>
          <div className="w-8 h-8 flex items-center justify-center bg-red-600 rounded-sm p-1">
            <p
              onClick={() => OpenModal(record)}
              className="m-0 text-white font-semibold  text-lg"
            >
              <MdOutlineDeleteForever />
            </p>
          </div>
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
            onClick={(e) => navigate("/control-panel")}
          >
            View All Sets
          </button>
          <button
            onClick={(e) => navigate("/control-panel")}
            className="bg-blue-800  text-white rounded py-1 px-2"
          >
            View My Sets
          </button>
        </div>

        <div className="flex items-center">
          <button
            className="bg-blue-800  text-white rounded py-1 px-2 "
            onClick={() => setIsAddOpen(true)}
          >
            Add Set
          </button>

          
         
        </div>
      </div>

      <div className="mt-8">
        <Table columns={columns} dataSource={allSets} />;
      </div>
      <SetModal isOpen={isAddOpen} setIsOpen={setIsAddOpen}/>
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} setData={currentSet} />
    </>
  );
};

export default Sets;
