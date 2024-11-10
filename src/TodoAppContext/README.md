# 3. Contexts

This is the thid example and it's fully based on the second one.

This shows how we can define something known as a **context** to wrap some stateful logic that can then be accessed by all the components of the sub-tree. 

In this example, we suppose we actually need **two completely identical** TODO forms and we want both of them to operate on the same TODOs and reflect the changes made in the other ones. 

In order to do that, we could create a _father_ component that provides the same stateful properties to both their children. But this is not the best approach and usually leads to code that's very difficult to maintain.

By using the context, we can implement all our TODO functionalities in something known as **Context Provider** and wrap our component subtree inside that context provider. We can then rely on the provided context to interact with our piece of state everywhere. 

In the `TodoContext.ts` you can see that the context is defined using the `createContext` function as follows

```typescript
export const TodoContext = createContext<TodoContextProps>(
  {} as TodoContextProps
);
```

Then, a context provider is defined. The latter allows to define our wrapper which will expose all the functionalities we need

```typescript
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

  return (
    <TodoContext.Provider
      value={{ todos, nextTodo, setNextTodo, addTodo, todoDone, todoDelete }}
    >
      {children}
    </TodoContext.Provider>
  );
}
```

All the children nodes of our context provider will be able to access the functions/variables provided in the `value` property. As you can see, the whole TODO logic was moved in this provider.

We can then define a custom _hook_ which allows components in the subtree to use this context. To respect react naming patterns, we are going to call this hook `useTodos` and we are going to define it in a separate file (`TodoContext.hook.tsx`)

```typescript
export const useTodos = () => useContext(TodoContext);
```

Now can can change our TODO component to directly use this context by doing this:

```typescript

// Let's define title as a property so that we can
// set it dinamically 
export interface TodoProps {
  title?: string;
}

export default function Todo({ title = "Todo List" }: TodoProps) {
  const todoHandler = useTodos(); // this calls the context

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
```

Now, we can render as many todos components as we want under the same context so that both can interact within the same state. 

```typescript
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
```

You will see that all the changes made in one TODO component are reflected also in the other one. Again, this is because they rely on the same state provided by the parent context provider.

Previously, I said that passing properties down the component hierarchy can lead to unmaintainable code: why? Well, supposing we have this component structure

```
Main
  Block1
    Header1
      Controls1
        Buttons1
          Button1
  Block2
    Header2
      Controls2
        Buttons2
          Button2
  Block3
    Header3
      Controls3
        Buttons3
          Button3
```

If I needed Button1/2/3 to trigger a callback defined in the Main component, I'd have to pass the callback down the whole component tree so that the button can trigger it. 

Using the context allows to make the callback available in the whole Main subtree so that the callback can be accessed everywhere by simply accessing the provided context.

## Beyond React Context

In production scenarios, sometimes React Context is not enough. Sometimes we might need to implement some global interaction between different states and this is not possible in a straightforward way using only React Context. This is where some third-party libraries come handy. The most famous one is [Redux](https://redux-toolkit.js.org/). However, if a react applications are strictly bound to an API, tools like [React Query](https://tanstack.com/query/latest) might provide all the functionalities needed for an efficient state managemend without having to add additional complexity.



