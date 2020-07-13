### Example of application with state management using Context API, Multiples Providers, Immer and embedded cache.

You can view a live demo over at https://codesandbox.io/s/eager-visvesvaraya-16uwp

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

#### Add a new item

```js
export const TodoForm = () => {
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
};
```

Running locally:

Clone this repo
`npm install` to install all req'd dependencies
`npm start` to start the local server (this project uses create-react-app)
