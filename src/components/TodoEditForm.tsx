import { useDispatch } from "react-redux";
import { editTodo, setEditing } from "../redux/todoSlice";
import { useState } from "react";

interface TodoEditFormProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
    isEditing: boolean;
  };
}

const TodoEditForm = ({ todo }: TodoEditFormProps) => {
  const [newText, setNewText] = useState(todo.text);
  const dispatch = useDispatch();

  const handleSave = () => {
    if (newText.trim()) {
      dispatch(editTodo({ id: todo.id, newText }));
      dispatch(setEditing({ id: todo.id, isEditing: false }));
    }
  };

  const handleCnacel = () => {
    dispatch(setEditing({ id: todo.id, isEditing: false }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full">
      <input
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        type="text"
        className="form-input rounded-md px-4 w-full border-gray-200"
        aria-label="Edit TODO"
      />
      <div className="edit-actions flex gap-3">
        <a
          onClick={handleSave}
          href="#"
          className="px-5 py-2 bg-sky-500 text-white hover:bg-sky-700 rounded-md"
        >
          Update
        </a>
        <a
          onClick={handleCnacel}
          href="#"
          className="px-5 py-2 bg-slate-100 text-neutral-950 hover:bg-slate-200 rounded-md"
        >
          Cancel
        </a>
      </div>
    </div>
  );
};

export default TodoEditForm;
