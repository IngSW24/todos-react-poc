import Todo from "./Todo";
import TodoContextProvider from "./TodoContext";

// This component is a container for two Todo components
// It uses the TodoContextProvider to wrap the Todo components
// This way, both Todo components will have access to the same context
// and will share the same state variables and functions
export default function MultipleTodos() {
  return (
    <TodoContextProvider>
      <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
        <Todo title="Todo List 1" />
        <Todo title="Todo list 2" />
      </div>
    </TodoContextProvider>
  );
}
