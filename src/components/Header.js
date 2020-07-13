import React from "react";
import { useStore } from "../lib";

export const Header = React.memo(() => {
  const store = useStore("UserStore");
  return (
    <>
      <button onClick={store.login}>login</button>
      <h1>Hello {store.currentUser}</h1>
      <h2>My ToDos</h2>
    </>
  );
});
