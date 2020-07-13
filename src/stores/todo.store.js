import { Store } from "../lib";

export const TodoStore = Store(() => ({
  todos: [],
  add(description) {
    this.todos.push({
      id: new Date().getTime(),
      description,
      done: false,
    });
  },
  toogle(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    this.todos[index].done = !this.todos[index].done;
  },
}));
