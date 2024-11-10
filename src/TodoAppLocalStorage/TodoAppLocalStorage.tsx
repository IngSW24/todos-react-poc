import { useEffect, useState } from "react";
import TrashCanIcon from "../Icons/TrashCanIcon";
import DoneIcon from "../Icons/DoneIcon";
import { getFromLocalStorage, saveToLocalStorage } from "./localStorage";
import { Todo } from "../types";

/**
 * Example 2
 *
 * Let's add local storage so that we can save the todos somewhere
 * between page reloads.
 */

export default function TodoAppLocalStorage() {
  // Now the initial todos are not empty, but loaded from local storage
  const [todos, setTodos] = useState<Todo[]>(getFromLocalStorage("ls-todos"));
  const [nextTodo, setNextTodo] = useState<string>("");

  // Let's introduce a SIDE EFFECT
  // This can be done via the useEffect hook in React and
  // allows us to run some code when some other stateful value changes (todos in this case)
  // In this case, whenever the todos list changes, we save it to local storage
  useEffect(() => saveToLocalStorage(todos, "ls-todos"), [todos]);

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

  return (
    <div className="todo">
      <h1 className="title">Todo With Local Storage</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Insert next todo"
          value={nextTodo}
          onChange={(e) => setNextTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todos.map((todo) => (
          <div key={todo.id} className="todo-entry">
            <div className="todo-controls">
              <button onClick={() => todoDone(todo.id)}>
                <DoneIcon width={20} height={20} />
              </button>
              <button onClick={() => todoDelete(todo.id)}>
                <TrashCanIcon width={20} height={20} />
              </button>
            </div>
            <span className={todo.done ? "todo-done" : ""}>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
