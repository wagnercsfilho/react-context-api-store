import React, { useState } from "react";
import { useStore } from "../lib";

export const TodoForm = React.memo(() => {
  const store = useStore("TodoStore");
  const [description, setDescription] = useState("");

  const addTodo = () => {
    store.add(description);
    setDescription("");
  };

  return (
    <>
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a description..."
      />
      <button disabled={!description} onClick={addTodo}>
        ADD TODO
      </button>
    </>
  );
});
