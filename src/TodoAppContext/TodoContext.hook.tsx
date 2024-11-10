import { useContext } from "react";
import { TodoContext } from "./TodoContext";

// This is a custom hook that simplifies the usage of the context
// it just calls the useContext hook with the context as the argument
export const useTodos = () => useContext(TodoContext);
