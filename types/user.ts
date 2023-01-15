export interface IStandardUser {
  name: string;
  username: string;
  email: string;
  password: string;
  dateOfBirth: string;
  imageUrl: string;
  _id: string;
}

export interface IUser extends IStandardUser {
  createdAt: string;
  updatedAt: string;
}

export interface IHaveFriendRequest {
  sentRequest: boolean;
  haveRequest: boolean;
  pendingRequest: boolean;
  areFriends: boolean;
}

export type IUserCard = Pick<IUser, "_id" | "username" | "imageUrl" | "name">;

export type IDirectMessageCard = IUserCard & { nodeId: string };
