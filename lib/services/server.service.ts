import axios from "axios";
import { IAxiosErrorResponse } from "types";

export const fetcherCacheData = new Map<
  string | null,
  { data: any; error: any }
>();

export const CacheAPIFetcher = async <T>(url: string) => {
  if (fetcherCacheData.has(url)) {
    const cachedData = fetcherCacheData.get(url);
    return {
      data: cachedData?.data as T,
      error: cachedData?.error as IAxiosErrorResponse,
    };
  }

  let data: T | null = null,
    error: IAxiosErrorResponse | null = null;

  try {
    const response = await axios.get<T>(url);

    data = response.data;
  } catch (err: any) {
    error = err.response;
  }

  fetcherCacheData.set(url, { data, error });
  return { data, error };
};
