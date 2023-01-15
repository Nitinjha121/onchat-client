import { IUser } from "./user";

export interface ITokenDetailsCookie {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
