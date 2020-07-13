import React from "react";

import { StoreProvider } from "./lib";
import { TodoStore } from "./stores/todo.store";
import { UserStore } from "./stores/user.store";
import { Home } from "./components/Home";

import "./styles.css";

export default function App() {
  return (
    <StoreProvider
      stores={{
        TodoStore,
        UserStore,
      }}
      storage={localStorage}
    >
      <Home />
    </StoreProvider>
  );
}
