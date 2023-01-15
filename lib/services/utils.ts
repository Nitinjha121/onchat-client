import { AxiosResponse } from "axios";

type IAxiosResponse = AxiosResponse<{ message: string }>;

export const isAxiosResponse = (
  e: unknown
): e is IAxiosResponse | undefined => {
  return (
    !!e &&
    typeof e == "object" &&
    "data" in e &&
    "request" in e &&
    e.request instanceof XMLHttpRequest
  );
};
