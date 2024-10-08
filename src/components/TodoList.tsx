import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  return (
    <>
      {todos.length === 0 ? (
        <p>No TODOs available.</p>
      ) : (
        <div className="tasks flex flex-col gap-5 h-auto overflow-y-scroll">
          {todos.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </>
  );
};

export default TodoList;
