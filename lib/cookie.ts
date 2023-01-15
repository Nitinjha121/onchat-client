import { setAxiosHeader } from "config/axios";
import cookie from "js-cookie";

//types
import { ITokenDetailsCookie } from "types";

class CookieAllOperations<T extends object> {
  private cookieName: string;

  constructor(name: string) {
    this.cookieName = name;
  }

  set = (value: T) => {
    const newValue = JSON.stringify(value);
    cookie.set(this.cookieName, newValue);
  };

  get = () => cookie.get(this.cookieName);

  get getJson() {
    const value = this.get();
    if (value) return JSON.parse(value) as ITokenDetailsCookie;
  }

  delete = () => cookie.remove(this.cookieName);
}

export const tokenDetailsCookie = new CookieAllOperations<ITokenDetailsCookie>(
  "token_details"
);

export const signIn = (tokenDetail: ITokenDetailsCookie) => {
  tokenDetailsCookie.set(tokenDetail);
  setAxiosHeader(tokenDetail.accessToken);
};

export const logout = () => {
  tokenDetailsCookie.delete();
  if (typeof window !== "undefined") window.location.href = "/signin";
};
