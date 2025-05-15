export declare function createSelectorHook<T>(store: StoreType<T>): <Selected>(selector: (state: T) => Selected) => Selected;

export declare function createUpdateStoreHook<T>(store: StoreType<T>): () => (fn: (state: T) => void) => void;

export declare class Store<T> {
    private state;
    private listeners;
    constructor(initialState: T);
    get: () => T;
    set: (payload: Partial<T> | ((state: T) => void)) => void;
    subscribe: (listener: (state: T) => void) => () => void;
}

declare type StoreType<T> = InstanceType<typeof Store<T>>;

export { }
