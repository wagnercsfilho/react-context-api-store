import { Store } from "../lib";

export const TodoStore = Store(({}) => {
  return {
    todos: [],
    add(description, { UserStore }) {
      this.todos.push({
        id: new Date().getTime(),
        description: description + " - from: " + UserStore.currentUser,
        done: false,
      });
    },
    toogle(id) {
      const index = this.todos.findIndex((t) => t.id === id);
      this.todos[index].done = !this.todos[index].done;
    },
  };
});
