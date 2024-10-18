import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
//import { toggleComplete, setEditing, deleteTodo } from "../redux/todoSlice";
import {
  setEditing,
  toggleCompleteWithNotification,
  deleteTodoWithNotification,
} from "../redux/todoSlice";

import TodoEditForm from "./TodoEditForm";

interface TodoListItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
  };
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleComplete = () => {
    dispatch(toggleCompleteWithNotification(todo.id, todo.completed));
  };

  const handleEdit = () => {
    dispatch(setEditing({ id: todo.id, isEditing: true }));
  };

  const handleDelete = () => {
    dispatch(deleteTodoWithNotification(todo.id));
  };

  return (
    <div className="flex gap-3 sm:gap-4 border-gray-200 border-2 p-4 sm:p-5 shadow-sm rounded-lg bg-white">
      {todo.isEditing ? (
        <TodoEditForm todo={todo} />
      ) : (
        <>
          <input
            checked={todo.completed}
            onChange={handleToggleComplete}
            type="checkbox"
            className="w-6 h-6 form-checkbox rounded border-slate-300 mt-1 focus:ring-0"
            aria-label="Complete"
          />

          <div className="flex flex-col gap-4 w-full">
            <h2
              className={`${
                todo.completed
                  ? "line-through text-lg sm:text-xl opacity-20"
                  : "text-lg sm:text-xl"
              }`}
            >
              {todo.text}
            </h2>
            <div className="actions flex gap-3">
              <a
                onClick={handleEdit}
                href="#"
                className="px-5 py-2 bg-sky-500 text-white hover:bg-sky-700 rounded-md"
              >
                Edit
              </a>
              <a
                onClick={handleDelete}
                href="#"
                className="px-5 py-2 bg-red-300 text-white hover:bg-red-400 rounded-md"
              >
                Delete
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoListItem;
