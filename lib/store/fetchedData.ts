export const createStore = <T>(initialState: T) => {
  let currentState = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => currentState,
    setState(newState: T) {
      currentState = newState;

      listeners.forEach((listener) => listener(currentState));
    },
    subscribe(listener: () => void) {
      listeners.add(listener);

      return () => listeners.delete(listener);
    },
    serverInitialize(initialState: T) {
      currentState = initialState;
    },
  };
};

export const fetchedDataStoreMap: Record<
  string,
  ReturnType<typeof createStore>
> = {};

export const createFetchedDataStore = <T>(
  key: string,
  initialState: T
): ReturnType<typeof createStore<T>> => {
  if (fetchedDataStoreMap[key])
    return fetchedDataStoreMap[key] as ReturnType<typeof createStore<T>>;
  else return (fetchedDataStoreMap[key] = createStore<T>(initialState));
};
