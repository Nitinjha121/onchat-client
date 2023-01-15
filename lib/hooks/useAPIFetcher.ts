import React, { useSyncExternalStore } from "react";

//recoil
import {
  APIDataErrorWrapper,
  APIFetcher,
  fetcherCacheData,
} from "lib/services";

//
import {
  createFetchedDataStore,
  fetchedDataStoreMap,
} from "lib/store/fetchedData";

interface IConfig {
  isClientFetching?: boolean;
}

interface IResponseStructure<T, E> {
  data?: T | null;
  error?: E | null;
}

export function useAPIFetcher<T, E = undefined | null>(
  key: string | null,
  options?: IConfig
) {
  const cachedData = fetcherCacheData.get(key);
  const [state, setState] = React.useState({
    data: cachedData?.data,
    error: cachedData?.error,
  });

  const store = createFetchedDataStore<IResponseStructure<T, E>>(key!, state);
  const data = useSyncExternalStore<IResponseStructure<T, E>>(
    store.subscribe,
    store.getState,
    store.getState
  );

  const fetchData = React.useCallback(() => {
    const cachedData = fetcherCacheData.get(key);

    if (key && cachedData) setState(cachedData);

    if (!cachedData?.data && !cachedData?.error && key) {
      APIFetcher(key)
        .then((data) => {
          fetcherCacheData.set(key, { data, error: null });
          setState((currState) => ({ ...currState, data }));
          store.setState({ data, error: null });
        })
        .catch((error) => {
          fetcherCacheData.set(key, { data: null, error });
          store.setState({ data: null, error });
        });
    }
  }, [key]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  // if (typeof window == "undefined" && !state) fetchData();

  return data;
}

export const mutate = async <T>(key: string) => {
  const data = await APIDataErrorWrapper<T>(() => APIFetcher(key));
  fetcherCacheData.set(key, data);
  const store = fetchedDataStoreMap[key];
  store?.setState(data);

  return data;
};
