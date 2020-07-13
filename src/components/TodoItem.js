import React from "react";

export const TodoItem = React.memo(({ todo, toogle }) => {
  return (
    <div
      style={{ textDecoration: todo.done ? "line-through" : "none" }}
      onClick={() => toogle(todo.id)}
      key={todo.id}
    >
      {todo.description}
    </div>
  );
});
