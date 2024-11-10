# 2. Side effects

This is the second example and it's fully based on the first one.

As you might have noticed, re-rendering the page for the first example causes the state to completely reset. This is completely normal, since React holds the state while the application is running and resets completely when the application loads a second time.

Usually we would want to store our state on some kind of DB using some APIs etc., but in this case using the local storage API of the browser is more than enough. 

We need to introduce two fundamental changes: 

- The initial state of the app (on page load) should contain the TODOs loaded from the local storage
- Everytime a todo is updated, added or deleted, we should update the memory in the local storage.

I implemented two functions in the `localStorage.ts` file, which provide the required functionalities to interact with the local storage API. 

The **first step** is easy, we can just initiate out todos by fetching the local storage (using the arbitrary key 'ls-todos'):

```typescript
const [todos, setTodos] = useState<Todo[]>(getFromLocalStorage("ls-todos"));
```

The **second step** can be implemented in various ways, but the most 'React-ive' way would involve introducing what is known as a **side effect**. React provides a hook called `useEffect` which allows to trigger a callback everytime some stateful component changes. It works like this

```typescript

useEffect(() => {
  // myCallback code
  return () => {
    // cleanup function (if needed)
  }
}, [...]) // an array of stateful elements that, when changed, will trigger the hook
```

In the context of saving todos to local storage we can do something like this: everytime the todo list changes, we will overwrite the local storage value. This way, we don't have to handle local storage inside all the other functions but we can, instead, attach the side effect directly to the todos variable by doing

```typescript
// no clean up function needed, so we can directly return the callback
useEffect(() => saveToLocalStorage(todos, "ls-todos"), [todos]);
```

In general, useEffect can be used for various purposes but it should not be **abused**. For a lot of time many react devs have used useEffect with an empty dependency array (which causes the callback to run only when the component is rendered) to run API calls. This can be done, but requires some logic that usually is not implemented. For this reason, it is best to use libraries like ReactQuery or SWR that provide a great stateful way of fetching APIs.

An example of how someone could use useEffect to fetch data from some api is the following one:

```typescript
import React, { useEffect, useState } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);      // Stores the fetched data
  const [loading, setLoading] = useState(true); // Stores loading state
  const [error, setError] = useState(null);     // Stores error, if any

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); // Update state with the fetched data
      } catch (err) {
        setError(err.message); // Set the error if any occurs
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this only runs on component render

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataFetchingComponent;
```

If you don't implement all the necessary state guards, you might end up fetching the API **more than one time**. React sometimes renders components 2/3 times and we don't necessarily need to know why, the point is that if we use a naive fetch implementation using useEffect we end up fetching the API 2/3 times as well (and we don't really want to do that). Using these guards allows us the ensure the fetch is performed only one time regarless of how many times the component is rendered. 
