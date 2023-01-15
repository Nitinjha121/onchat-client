export const BASH_URL = "http://localhost:8000";

export const GET_ALL_USER_FRIENDS = `/user/all-friends`;

//auth
export const VALIDATE_AUTH_TOKEN = "/auth/validate";
export const USER_SIGNUP = "/auth/signup";
export const USER_SIGNIN = "/auth/signin";
export const USER_LOGOUT = "/auth/logout";

//user personal view
export const USER_FRIEND_SEARCH = (search: string) =>
  `/user/search?search=${search}`;
export const HAVE_FRIEND_REQUEST = (userId: string) =>
  `/user/have-request/${userId}`;
export const CANCEL_FRIEND_REQUEST = (userId: string) =>
  `/user/cancel-request/${userId}`;
export const SENT_FRIEND_REQUEST = (userId: string) =>
  `/user/sent-request/${userId}`;
export const ACCEPT_FRIEND_REQUEST = (userId: string) =>
  `/user/accept-request/${userId}`;
export const GET_ALL_PENDING_FRIEND_REQUEST = (perPage: number, page: number) =>
  `/user/all-request/?${perPage ? `perPage=${perPage}` : ""}&${
    page ? `page=${page}` : ""
  }`;

//chat
export const GET_USER_DIRECT_MESSAGES = (
  directMessageId: string,
  perPage?: number,
  cursor?: string
) =>
  `/chat/private-message/${directMessageId}/${
    perPage ? `?perPage=${perPage}` : ""
  }${cursor ? `&cursor=${cursor}` : ""}`;

export const SEND_DIRECT_MESSAGE_TO_USER = (
  userId: string,
  messageId: string
) => `/chat/private-message/${userId}/${messageId}`;

export const GET_USER_MOST_RECENT_DM = `/user/recent-dm/`;

//block unblock flow
export const GET_ALL_BLOCKED_USERS = `/user/blocked-users`;
export const BLOCK_USER = (userId: string) => `/user/block/${userId}`;
export const UNBLOCK_USER = (userId: string) => `/user/unblock/${userId}`;
