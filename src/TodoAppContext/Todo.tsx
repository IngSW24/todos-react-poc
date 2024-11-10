import DoneIcon from "../Icons/DoneIcon";
import TrashCanIcon from "../Icons/TrashCanIcon";
import { useTodos } from "./TodoContext.hook";

// Let's define the component title as a property
// so that it can be customized when using the component
export interface TodoProps {
  title?: string;
}

// The Todo component is now a functional component that uses the useTodos hook
// to access the todos state and the functions to add, delete and mark todos as done
// The component also receives the title as a property and renders it as the title of the todo list

export default function Todo({ title = "Todo List" }: TodoProps) {
  // Let's access the context
  const todoHandler = useTodos();

  // Let's replace the state variables and functions with the ones from the context
  return (
    <div className="todo">
      <h1 className="title">{title}</h1>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Insert next todo"
          value={todoHandler.nextTodo}
          onChange={(e) => todoHandler.setNextTodo(e.target.value)}
        />
        <button onClick={todoHandler.addTodo}>Add</button>
      </div>
      <div className="todo-list">
        {todoHandler.todos.map((todo) => (
          <div key={todo.id} className="todo-entry">
            <div className="todo-controls">
              <button onClick={() => todoHandler.todoDone(todo.id)}>
                <DoneIcon width={20} height={20} />
              </button>
              <button onClick={() => todoHandler.todoDelete(todo.id)}>
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
