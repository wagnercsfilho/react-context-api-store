import React from "react";
import { Header } from "./Header";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const Home = React.memo(() => {
  return (
    <div className="App">
      <Header />
      <TodoForm />
      <TodoList />
    </div>
  );
});
