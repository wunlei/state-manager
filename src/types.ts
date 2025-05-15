import type Store from "./store";

export type Listener<T> = (state: T) => void;

export type StoreType<T> = InstanceType<typeof Store<T>>;
