import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";

const TodoForm = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (todoText.trim()) {
      dispatch(addTodo(todoText));
      setTodoText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 sm:gap-5 w-full flex-col sm:flex-row"
    >
      <input
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        aria-label="Enter TODO"
        type="text"
        className="form-input rounded-md px-4 w-full border-gray-200 focus:outline-none focus:border-sky-500"
        placeholder="Enter a TODO Item"
      />
      <input
        type="submit"
        value="Add New Task"
        className="px-5 py-2 bg-sky-500 text-white hover:bg-sky-700 cursor-pointer rounded-md "
      />
    </form>
  );
};

export default TodoForm;
