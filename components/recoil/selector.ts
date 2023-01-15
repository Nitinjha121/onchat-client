import { DefaultValue, selector } from "recoil";

//atoms
import { globalToasterDataStateAtom } from "./atom";

//lib
import { tokenDetailsCookie } from "lib/cookie";

//types
import { ITokenDetailsCookie } from "types";
import { IToastAlertInterface } from "./types";

export const currentUserDataSelector = selector<
  ITokenDetailsCookie["user"] | null
>({
  key: "currentUserDataSelector",
  get: () => {
    const tokenDetails = tokenDetailsCookie.getJson;

    if (tokenDetails?.user) return tokenDetails.user;
    return null;
  },
});

type IGlobalToasterDataStateHandler =
  | {
      isRemove: true;
      id: string;
    }
  | (Omit<IToastAlertInterface, "id"> & { id?: string });

export const globalToasterDataStateHandlerSelector =
  selector<IGlobalToasterDataStateHandler | null>({
    key: "globalToasterDataStateHandler",
    get: () => null,

    set: ({ set }, newValue) => {
      if (newValue && !(newValue instanceof DefaultValue)) {
        if ("isRemove" in newValue) {
          set(globalToasterDataStateAtom, (state) =>
            state.filter((node) => node.id != newValue.id)
          );
        } else {
          newValue.id = crypto.randomUUID();
          set(globalToasterDataStateAtom, (state) => [
            ...state,
            newValue as IToastAlertInterface,
          ]);
        }
      }
    },
  });
