import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, fetchTodo, deleteTodo, updateTodo } from "../redux/todoSlice";
import { nanoid } from "@reduxjs/toolkit";
import {
  RiDeleteBin5Line,
  RiPenNibFill,
  RiPenNibLine,
  RiSaveFill,
} from "react-icons/ri";
import { FaSave } from "react-icons/fa";

export function Todo() {
  const data = useSelector((state) => state.todo.data);
  //   console.log("data :", data);
  const dispatch = useDispatch();

  const [newTodo, setNewTodo] = useState({
    id: nanoid(),
    title: "",
    completed: false,
  });

  // add and submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title.trim() === "") return;
    dispatch(addTodo(newTodo));
    // empty  field
    setNewTodo({ id: nanoid(), title: "", completed: false });
  };
  const handleChange = (e) => {
    setNewTodo({ ...newTodo, title: e.target.value });
  };

  //  fetch list of todos
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  // update and save
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const handleUpdate = (todo) => {
    setEditId(todo.id);
    setEditTitle(todo.title);
  };

  const handleUpdateSave = () => {
    if (editTitle.trim() === "") return;
    dispatch(updateTodo({ id: editId, title: editTitle, completed: false }));
    setEditId(null);
    setEditTitle("");
  };

  // delete todo
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h1 className="text-indigo-500 text-3xl font-bold underline p-3 mb-4">
        ToDo Fetching by AXIOS
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border-1 rounded-lg p-2 mr-1 bg-gray-100 hover:bg-gray-200"
          value={newTodo.title}
          onChange={handleChange}
          type="text"
          placeholder="Add Todo"
        />
        <button
          type="submit"
          className="bg-indigo-500 cursor-pointer p-2 rounded-lg border-1 hover:bg-indigo-600 text-white "
        >
          ADD
        </button>
      </form>

      {/* show todos  from here*/}
      <h1 className="text-indigo-500 text-3xl font-bold underline p-3 mt-10">
        TO-DO List
      </h1>

      <div>
        {data.map((todo) => (
          <li
            key={todo.id}
            className="border-1 rounded-lg p-2 my-2 flex flex-row justify-between"
          >
            {editId === todo.id ? (
              <input
                type="text"
                className="border-1 rounded-lg p-2 mr-1 bg-gray-100 hover:bg-gray-200"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              <div className="text-black">{todo.title}</div>
            )}

            <div className="flex flex-row space-x-3 justify-between">
              {editId === todo.id ? (
                <button
                  onClick={handleUpdateSave}
                  className=" bg-green-500 p-2 cursor-pointer rounded-lg border-1 hover:bg-green-600 text-white"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => handleUpdate(todo)}
                  className=" bg-gray-500 p-2 cursor-pointer rounded-lg border-1 hover:bg-gray-600 text-white"
                >
                  <RiPenNibFill />
                </button>
              )}

              <button
                onClick={() => handleDelete(todo.id)}
                className=" bg-red-500 p-2 cursor-pointer rounded-lg border-1 hover:bg-red-600 text-white"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </li>
        ))}
      </div>
    </div>
  );
}
