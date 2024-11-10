import { createContext, useEffect, useState } from "react";
import { Todo } from "../types";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../TodoAppLocalStorage/localStorage";

// This defines all the properties that the context will have
// this is more of a typescript thing than a react thing
// but it's good to have it defined here
export interface TodoContextProps {
  todos: Todo[];
  nextTodo: string;
  setNextTodo: (nextTodo: string) => void;
  addTodo: () => void;
  todoDone: (id: number) => void;
  todoDelete: (id: number) => void;
}

// This is the context itself, it's created with the createContext function
// and it's initialized with an empty object (casted to the TodoContextProps type)

// eslint-disable-next-line react-refresh/only-export-components
export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);

// This is the provider component that will wrap the components that need access to the context
// it receives the children as a prop and returns the context provider
// it also initializes the state variables and the functions to update them
// and it uses the useEffect hook to save the todos to local storage whenever they change
export default function TodoContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [todos, setTodos] = useState<Todo[]>(getFromLocalStorage("ctx-todos"));
  const [nextTodo, setNextTodo] = useState<string>("");

  useEffect(() => saveToLocalStorage(todos, "ctx-todos"), [todos]);

  const addTodo = () => {
    if (nextTodo === "") {
      alert("You cannot add en empty todo");
      return;
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      text: nextTodo,
      done: false,
    };

    setTodos([...todos, newTodo]);
    setNextTodo("");
  };

  const todoDone = (id: number) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const todoDelete = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  // The provider returns the context provider with the value set to the state variables and functions
  // this way, all the components that are children of this provider will have access to the context
  return (
    <TodoContext.Provider
      value={{ todos, nextTodo, setNextTodo, addTodo, todoDone, todoDelete }}
    >
      {children}
    </TodoContext.Provider>
  );
}
