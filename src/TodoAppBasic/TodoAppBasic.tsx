import { useState } from "react";
import TrashCanIcon from "../Icons/TrashCanIcon";
import DoneIcon from "../Icons/DoneIcon";
import { Todo } from "../types";

// This is a simple todo app example that uses React's useState hook
// and triggers functions to add, delete and mark todos as done

export default function TodoAppBasic() {
  // 'useState' allows to define a state variable and a function to update it
  // In this case, we are defining two state variables: 'todos' and 'nextTodo'
  // 'todos' is an array of 'Todo' objects that will store the todos
  // 'nextTodo' is a string that will store the text of the next todo to add
  // useState always returns an array with two elements: the state variable and the function to update it
  const [todos, setTodos] = useState<Todo[]>([]);
  const [nextTodo, setNextTodo] = useState<string>("");

  // This function adds a new todo to the list
  // It creates a new 'Todo' object with the nextTodo text
  // and sets the 'done' property to false. Then, it adds the new todo to the 'todos' array
  // Finally, it resets the 'nextTodo' state variable to an empty string

  const addTodo = () => {
    if (nextTodo === "") return;

    const newTodo: Todo = {
      id: todos.length + 1,
      text: nextTodo,
      done: false,
    };

    // This is very important: we should never mutate the state directly
    // Instead, we should create a new array with the new values and set it
    // This way, React knows that the state has changed and will re-render the component
    setTodos([...todos, newTodo]);
    setNextTodo("");
  };

  // This function toggles the 'done' property of a todo
  // Again, we should never mutate the state directly. Instead, we create a new array
  // It seems inefficient to create a new array every time, but React is smart enough to optimize this
  // and only re-render the changed components
  const todoDone = (id: number) =>
    // some javascript shorthand to toggle the 'done' property in one line, using map
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  // This function deletes a todo from the list
  // It filters the todos array, keeping only the todos with id different than the one to be deleted
  // Again, we should never mutate the state directly. Instead, we create a new array
  const todoDelete = (id: number) => setTodos(todos.filter((t) => t.id !== id));

  // The component returns the JSX to render the todo list
  // JSX is a syntax extension for JavaScript that looks similar to HTML but is actually JavaScript
  // The curly braces allow us to embed JavaScript expressions in JSX
  // The map function is used to iterate over the 'todos' array and render each todo
  // Some html attributes are different (i.e. 'class' is 'className') because they are reserved words in JavaScript, but the rest is identical to HTML
  return (
    <div className="todo">
      <h1 className="title">Basic Todo</h1>

      <div className="add-todo">
        <input
          type="text"
          placeholder="Insert next todo"
          // it shows the nextTodo state variable (which starts as an empty string)
          value={nextTodo}
          // Curly braces to trigger out setNextTodo function to update the nextTodo state variable
          onChange={(e) => setNextTodo(e.target.value)}
        />
        {/* This triggers the add todo function */}
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        {/* The map function is used to iterate over the 'todos' array and render each todo */}
        {todos.map((todo) => (
          <div key={todo.id} className="todo-entry">
            <div className="todo-controls">
              {/* This triggers the done todo function */}
              <button onClick={() => todoDone(todo.id)}>
                <DoneIcon width={20} height={20} />
              </button>

              {/* This triggers the delete todo function */}
              <button onClick={() => todoDelete(todo.id)}>
                <TrashCanIcon width={20} height={20} />
              </button>
            </div>

            {/* We can do some conditional rendering based on the value of the variable 'done' */}
            <span className={todo.done ? "todo-done" : ""}>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
