import React from "react";

export interface IToastAlertInterface {
  id?: string;
  kind: "success" | "warning";
  heading: string;
  description: string | React.ReactNode;
}

type IAction =
  | {
      type: "ADD_TOAST_ALERT";
      payload: IToastAlertInterface;
    }
  | {
      type: "REMOVE_TOAST_ALERT";
      payload: string;
    };

interface IGlobalContextState {
  toastAlerts: IToastAlertInterface[];
}

const initialState: IGlobalContextState = {
  toastAlerts: [],
};

export const GlobalContext = React.createContext<{
  globalState: IGlobalContextState;
  globalDispatch: React.Dispatch<IAction>;
  addToaster: (args: Omit<IToastAlertInterface, "id" | "heading">) => void;
}>({
  globalState: initialState,
  globalDispatch: () => {},
  addToaster() {},
});

const globalReducer = (
  state: IGlobalContextState,
  action: IAction
): IGlobalContextState => {
  switch (action.type) {
    case "ADD_TOAST_ALERT":
      action.payload["id"] = crypto.randomUUID();
      return { ...state, toastAlerts: [...state.toastAlerts, action.payload] };
    case "REMOVE_TOAST_ALERT":
      return {
        ...state,
        toastAlerts: state.toastAlerts.filter(
          (toastAlert) => toastAlert.id != action.payload
        ),
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }: React.PropsWithChildren) {
  const [globalState, globalDispatch] = React.useReducer(
    globalReducer,
    initialState
  );

  const addToaster = React.useCallback(
    (data: Omit<IToastAlertInterface, "id" | "heading">) =>
      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: {
          heading: data.kind,
          ...data,
        },
      }),
    []
  );

  return (
    <GlobalContext.Provider value={{ globalState, globalDispatch, addToaster }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return React.useContext(GlobalContext);
}
