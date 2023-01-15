import axios, { AxiosResponse } from "axios";
import { IAxiosErrorResponse } from "types";

export const APIFetcher = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIPusher = async <T>(url: string, data: T) => {
  try {
    const response = await axios.post(url, data);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIUpdater = async <T>(url: string, data: T) => {
  try {
    const response = await axios.put(url, data);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIRemover = async (url: string) => {
  try {
    const response = await axios.delete(url);

    return response.data;
  } catch (err: any) {
    throw err.response as AxiosResponse;
  }
};

export const APIDataErrorWrapper = async function <T>(
  Method: () => Promise<T>
) {
  let data: T | null = null,
    error: IAxiosErrorResponse | null = null;

  try {
    data = await Method();
  } catch (err: any) {
    error = err;
  }

  return { data, error };
};
