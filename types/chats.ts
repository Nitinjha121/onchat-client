import { IUser, IUserCard } from "./user";

export interface IMessage {
  content: string;
  attachments: string[];
}

export interface IDirectMessage {
  _id: string;
  message: IMessage[];
  user: IUserCard;
}

export interface IChatMessageNode {
  attachments: string[];
  sender: IUserCard;
  receiver: string;
  content: string;
  createdAt: string;
  mentionEveryone: boolean;
  mentions: string[];
  parentId: "63b6b70b09aabf4b2fcf98ba";
  replies: IChatMessageNode[];
  referencedMessage: IChatMessageNode;
  updatedAt: string;
  _id: "63bb182bfafe5cb67ea97e1f";
}
