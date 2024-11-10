// Let's define the required utilities to save and load the
// todos from local storage

import { Todo } from "../types";

export const saveToLocalStorage = (todos: Todo[], key: string) => {
  localStorage.setItem(key, JSON.stringify(todos));
};

export const getFromLocalStorage = (key: string): Todo[] => {
  const todos = localStorage.getItem(key);
  return todos ? JSON.parse(todos) : [];
};
