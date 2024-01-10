import React, { useEffect, useState } from "react";
import axios from "axios";
import api_url from "../../api/api_url.js";
import { IoAddCircleOutline } from "react-icons/io5";
import { log } from "three/nodes";

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
            className="h-[48px] pl-[16px] rounded-[8px] bg-[#262626] w-full"
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
      <div className="flex flex-col gap-2 mt-10">
        {data?.Todos?.sort((a, b) => a.todo_id - b.todo_id)
          .map((item, index) => (
            <div key={index} className="flex gap-2 border border-red-400">
              <input
                type="checkbox"
                name=""
                id=""
                checked={item.completed}
                onChange={() => {
                  completedFunc(item.todo_id, item.completed);
                }}
              />
              {editableItemId === item.todo_id ? (
                <>
                  <input
                    className="border border-blue-500"
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
                <>
                  <h2>{item.todo}</h2>
                  <button
                    className="border border-black"
                    onClick={() => setEditableItemId(item.todo_id)}
                  >
                    update
                  </button>
                </>
              )}
              <button
                className="border border-black"
                onClick={() => deleteItem(item.todo_id)}
              >
                delete
              </button>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default CreateTodo;
