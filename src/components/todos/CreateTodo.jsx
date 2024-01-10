import React, { useEffect, useState } from "react";
import axios from "axios";
import api_url from "../../api/api_url.js";

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
      console.log(response);
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
      setEditableItemId(null); // Reset editable item after updating
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            className="border border-green-600"
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">ADD</button>
        </div>
      </form>
      <div className="flex flex-col gap-2">
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
