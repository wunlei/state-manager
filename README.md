## state-manager

[Todo-list Example](./examples/task-list/)

### Installation

```bash
npm install wunlei/state-manager
```

### Usage with React

#### Create store and hooks

```tsx
import { Store } from "state-manager";

export type AppState = {
  counter: number;
};

const appStore = new Store<AppState>({ counter: 0 });

const useAppSelector = createSelectorHook<AppState>(appStore);

const useUpdateAppStore = createUpdateStoreHook<AppState>(appStore);
```

#### Use in component

```tsx
function App() {
  const counter = useAppSelector((state) => state.counter);
  const update = useUpdateAppStore();

  return (
    <button onClick={() => update((state) => { state.counter += 1 })}>
      count is {counter}
    </button>
  );
}
```
