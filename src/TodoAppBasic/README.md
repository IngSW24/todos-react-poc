# 1. Basic Todo App Example

This is the first example of the TODO app. The main objective here is to show how React handles the state and dynamically renders and updates the UI. 

## Declaring stateful variables

The basic idea is the following

```typescript
const MyComponent = (): React.FC => {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      Clicked {count} times
    </button>
  )
}
```

A variable of any type can be declared using `useState`. The argument of useState accepts the initial value of the variable and returns a list containing the stateful variable and a function to update it. The best practise is to apply the naming conventions used in the example, so that the function is always named as `setVariableName` when the variable name is `variableName`.

The function `setVariableName` allows us to update the value by either:

- Providing a new value for the variable (`setCount(3)`)
- Using a callback function that takes as input the current value and returns the new one (`setCount(current => current + 1)`)

## Immutability

As you will see in the code, **immutability** is very important in React. Everytime something changes, it must be recreated. For example, if we are using a stateful list and a new value is added, we shouldn't add the new value to the list. We should, instead, recreate the whole list including the new value. This can be done easily using some javascript spread syntax. For example

```typescript

const [myList, setMyList] = useState(["first", "second", "third"]);

const addFourth = () => {
  setMyList([...myList, "fourth"])
}
```

In this case, the function sets the list as a new list which spreads all the elements of the previous one and adds the new one as the last one.

#### Isn't that highly inefficient?

It should be. But because of how React works behind the scenes it is actually not. This is due to the fact that React uses a **Virtual Dom** to dynamically update only what has actually changed and, therefore, optimizes our code to be efficient.

## Rendering via JSX

JSX is a syntax that looks very close to HTML even though it is actually Javascript. Every component returns some JSX code which represent how the component will be rendered. JSX allows to embed javascript using curly braces and this allows to:

- Use javascript to perform conditional rendering
- Map arrays
- Invoke callbacks

For example

```typescript

export const MyComponent = () => {

  const [myList, setMyList] = useState(["first", "second", "third"]);
  const [showTitle, setShowTitle] = useState(true);

  return (
    <div>
      {showTitle && <h1>Hello</h1>}
      {myList.map((entry, index) => (
        <span key={index}>{entry}</span>
      ))}
      <button onClick={() => setShowTitle(p => !p)}>Show Title</button>
    </div>
  )
}
```

What happens here:

- The title is rendered only if the `showTitle` variable is set to true
- The list is mapped using the JS map function and each element is rendered as a span containing the text value. When mapping arrays, React requires to specify a  `key` property for proper rendering optimization
- The button invokes a callback that toggles the `showTitle` variable

