import { tokenDetailsCookie } from "lib/cookie";
import { atom, atomFamily } from "recoil";
import { ITokenDetailsCookie, IDirectMessageCard } from "types";
import { IToastAlertInterface } from "./types";

export const fetchedDataStoreAtomFamily = atomFamily<any, string>({
  key: "fetchedDataStoreAtomFamily",
  default: null,
});

export const currentUserDataAtom = atom<ITokenDetailsCookie["user"] | null>({
  key: "currentUserDataAtom",
  default: null,
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger == "set") return;

      setTimeout(() => {
        const tokenDetails = tokenDetailsCookie.getJson;
        if (tokenDetails?.user) setSelf(tokenDetails.user);
      }, 0);
    },
  ],
});

export const tokenDetailsCookieAtom = atom<ITokenDetailsCookie | null>({
  key: "tokenDetailsCookieAtom",
  default: null,
  effects: [
    ({ setSelf, trigger, onSet }) => {
      if (trigger == "set") {
        onSet((newValue) => {
          if (newValue) tokenDetailsCookie.set(newValue);
          else tokenDetailsCookie.delete();
        });
        return;
      }

      setTimeout(() => {
        const tokenDetails = tokenDetailsCookie.getJson;
        if (tokenDetails) setSelf(tokenDetails);
      }, 0);
    },
  ],
});

export const selectedDMUserDataAtom = atom<IDirectMessageCard | null>({
  key: "selectedDMUserDataAtom",
  default: null,
});

export const globalToasterDataStateAtom = atom<IToastAlertInterface[]>({
  key: "globalToasterDataStateAtom",
  default: [],
});
