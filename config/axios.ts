import axios from "axios";
import { BASH_URL } from "lib/constants";
import { tokenDetailsCookie } from "lib/cookie";

if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = BASH_URL;
} else {
  axios.defaults.baseURL = BASH_URL;
}

export const setAxiosHeader = (token: string | null | undefined) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else axios.defaults.headers.common["Authorization"] = "";
};

(() => {
  if (typeof window != "undefined") {
    setAxiosHeader(tokenDetailsCookie.getJson?.accessToken);
  }
})();
