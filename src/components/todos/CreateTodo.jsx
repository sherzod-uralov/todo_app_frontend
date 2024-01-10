import React, { useEffect, useState } from "react";
import axios from "axios";
import api_url from "../../api/api_url.js";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const [completedStatus, setCompletedStatus] = useState({});
  const [updateTodo, setUpdateTodo] = useState("");
  const [data, setData] = useState("");
  const [editableItemId, setEditableItemId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${api_url}/todo`,
        {
          todo,
        },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );
      getData();
      setTodo("");
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const getResponse = await axios.get(`${api_url}/todo`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      setData(getResponse?.data?.users[0]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id) => {
    try {
      const getResponse = await axios.delete(`${api_url}/todo/${id}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      console.log(getResponse);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const updateItem = async (id) => {
    try {
      const getResponse = await axios.put(
        `${api_url}/todo/${id}`,
        { todo: updateTodo },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );
      getData();
      setEditableItemId(null);
    } catch (e) {
      console.log(e);
    }
  };

  const completedFunc = async (id, completedStatuses) => {
    try {
      const getResponse = await axios.put(
        `${api_url}/todo/${id}`,
        { completed: !completedStatuses },
        {
          headers: {
            Authorization: localStorage.getItem("authToken"),
          },
        },
      );
      console.log(getResponse);
      getData();
    } catch (e) {
      console.log(e);
    }
  };

  const completedLength = data?.Todos?.filter((i) => i.completed);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex -translate-y-7 justify-between"
      >
        <div className="flex w-full gap-2">
          <input
            className="h-[48px] outline-none text-white pl-[16px] rounded-[8px] bg-[#262626] w-full"
            type="text"
            required={true}
            placeholder="Add a new task"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-[#1E6F9F] text-white flex gap-[8px] p-[12px] rounded-[8px] items-center"
          >
            ADD <IoAddCircleOutline className="text-xl text-white" />
          </button>
        </div>
      </form>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="text-[#4EA8DE]">Tasks</h2>
          <span className="bg-[#333] text-white block rounded-xl px-[8px]">
            {data?.Todos?.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <h2 className="text-[#4EA8DE]">Tasks</h2>
          <span className="bg-[#333] text-white flex items-center gap-1 rounded-xl px-[8px]">
            <span>{completedLength?.length}</span>
            <span>to</span>
            <span>{data?.Todos?.length}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-[12px] mt-10">
        {data?.Todos?.sort((a, b) => a.todo_id - b.todo_id)
          .map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-4 rounded-[8px] px-[16px] bg-[#333] gap-2 "
            >
              <div className="flex items-center gap-[12px]">
                <label className="flex relative items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => {
                      completedFunc(item.todo_id, item.completed);
                    }}
                    className="appearance-none w-5 h-5 rounded-full border border-gray-300 checked:bg-[#5E60CE] checked:border-transparent focus:outline-none"
                  />
                  {item.completed ? (
                    <svg
                      className="w-4 h-4 -left-[6px] z-50 absolute fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  ) : null}
                </label>
                <div className="flex">
                  {editableItemId === item.todo_id ? (
                    <>
                      <input
                        className="border absolute border-blue-500"
                        type="text"
                        value={updateTodo}
                        onChange={(e) => setUpdateTodo(e.target.value)}
                      />
                      <button
                        className="border border-black"
                        onClick={() => updateItem(item.todo_id)}
                      >
                        save
                      </button>
                    </>
                  ) : (
                    <h2 className="text-white text-[14px]">{item.todo}</h2>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <RiEdit2Line
                  className="text-[#808080] text-2xl hover:text-white transition-all"
                  onClick={() => setEditableItemId(item.todo_id)}
                />
                <MdDelete
                  className="text-[#808080] text-2xl hover:text-white transition-all"
                  onClick={() => deleteItem(item.todo_id)}
                />
              </div>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default CreateTodo;
