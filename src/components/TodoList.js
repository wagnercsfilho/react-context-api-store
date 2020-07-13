import React, { useCallback } from "react";
import { useStore } from "../lib";
import { TodoItem } from "./TodoItem";

export const TodoList = React.memo(() => {
  const store = useStore("TodoStore");

  const toogle = useCallback((id) => {
    store.toogle(id);
  }, []);

  return store.todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} toogle={toogle} />
  ));
});
