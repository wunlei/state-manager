import { produce } from "immer";
import type { Listener } from "./types";

export default class Store<T> {
  private state: T;
  private listeners = new Set<Listener<T>>();

  constructor(initialState: T) {
    this.state = initialState;
  }

  get = (): T => {
    return this.state;
  };

  set = (payload: Partial<T> | ((state: T) => void)): void => {
    const nextState =
      typeof payload === "function"
        ? produce(this.state, payload)
        : { ...this.state, ...payload };

    if (nextState !== this.state) {
      this.state = nextState;
      this.listeners.forEach((listener) => listener(this.state));
    }
  };

  subscribe = (listener: (state: T) => void) => {
    this.listeners.add(listener);

    return (): void => {
      this.listeners.delete(listener);
    };
  };
}
