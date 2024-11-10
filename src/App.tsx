import { useState } from "react";
import MultipleTodos from "./TodoAppContext/MultipleTodos";
import TodoAppBasic from "./TodoAppBasic/TodoAppBasic";
import TodoAppLocalStorage from "./TodoAppLocalStorage/TodoAppLocalStorage";

// All the examples implemented with title and path
const examples = [
  {
    name: "1. Basic Todo",
    Component: TodoAppBasic,
    path: "src/TodoAppBasic/TodoAppBasic.tsx",
  },
  {
    name: "2. Todo with Local Storage",
    Component: TodoAppLocalStorage,
    path: "src/TodoAppLocalStorage/TodoAppLocalStorage.tsx",
  },
  {
    name: "3. Todo with Context",
    Component: MultipleTodos,
    path: "src/TodoAppContext/MultipleTodos.tsx",
  },
];

export default function App() {
  // Let's define a stateful variable to keep track of the selected example
  const [choice, setChoice] = useState<number | null>(null);

  return (
    <>
      {/* Let's map each example to a button that updates the choice */}
      <div className="example-choice">
        <h2>Choose the example</h2>
        <div className="examples">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => setChoice(index)}
              className={choice === index ? "active-example" : ""}
            >
              {example.name}
              <br />
              <code>{example.path}</code>
            </button>
          ))}
        </div>
      </div>

      {/* Let's render the selected example (or ask to select one if null) */}
      <div className="example">
        {choice !== null &&
          (() => {
            const SelectedComponent = examples[choice].Component;
            return (
              <div className="fade" key={choice}>
                <SelectedComponent />
              </div>
            );
          })()}
        {choice === null && (
          <div className="fade" style={{ textAlign: "center" }}>
            <h1>Please select an example</h1>
          </div>
        )}
      </div>
    </>
  );
}
