import { useSyncExternalStore } from "react";
import type { StoreType } from "./types";

export function createSelectorHook<T>(store: StoreType<T>) {
  return function useSelector<Selected>(
    selector: (state: T) => Selected
  ): Selected {
    return useSyncExternalStore(store.subscribe, () => selector(store.get()));
  };
}

export function createUpdateStoreHook<T>(store: StoreType<T>) {
  return function useUpdateStore(): (fn: (state: T) => void) => void {
    return (fn: (state: T) => void) => {
      store.set(fn);
    };
  };
}
