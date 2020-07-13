### Example of application with state management using Context API and Immer with embedded cache.

#### Create a Store

```js
const TodoStore = Store(() => ({
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
```

#### Pass the Store to Provider

```js
function App() {
  return (
    <StoreProvider stores={{ TodoStore }}>
      <TodoList />
    </StoreProvider>
  );
}
```

#### Get store using useStore hook

```js
const TodoList = () => {
  const store = useStore("TodoStore");

  const toogle = useCallback((id) => {
    store.toogle(id);
  }, []);

  return store.todos.map((todo) => (
    <TodoItem key={todo.id} todo={todo} toogle={toogle} />
  ));
};
```

#### Use react.memo to prevent unnecessary rendering

```js
const TodoItem = React.memo(({ todo, toogle }) => {
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
```

In the project directory, you can run:

`npm start`

Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
