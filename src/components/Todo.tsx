import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Todo = () => {
  return (
    <div className="container flex flex-col justify-center items-center mx-auto max-w-[90%] sm:max-w-screen-md h-screen py-5 sm:py-10">
      <div className="bg-gray-100 border-gray-200 border-2 flex flex-col gap-5 w-full justify-center p-5 md:p-10 rounded-lg max-h-full">
        <h1 className="font-bold text-4xl">TODO List Application</h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
};

export default Todo;
