import React from "react";

//context
import {
  GlobalContext,
  IToastAlertInterface,
} from "components/contexts/GlobalContextProvider";

import { XMarkIcon } from "@heroicons/react/20/solid";

function ToastAlerts() {
  const { globalState } = React.useContext(GlobalContext);

  return (
    <div className="flex gap-5 flex-col absolute top-10 right-10 z-50">
      {globalState.toastAlerts.map((toastAlert) => (
        <ToastAlert data={toastAlert} key={toastAlert.id} />
      ))}
    </div>
  );
}

export default ToastAlerts;

interface IToastAlertProps {
  data: IToastAlertInterface;
}

const ToastAlert = ({ data }: IToastAlertProps) => {
  const { globalDispatch } = React.useContext(GlobalContext);

  React.useEffect(() => {
    const timer = setTimeout(
      () =>
        globalDispatch({
          type: "REMOVE_TOAST_ALERT",
          payload: data.id!,
        }),
      5000
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      key={data.id}
      className="rounded-md overflow-hidden shadow-md min-w-[250px]"
    >
      <div
        className={`${
          data.kind === "success" ? "bg-green-400" : "bg-yellow-400"
        } px-2 py-1 flex justify-between gap-2`}
      >
        {data.heading}

        <XMarkIcon
          className="w-5 h-5 cursor-pointer"
          onClick={() =>
            globalDispatch({
              type: "REMOVE_TOAST_ALERT",
              payload: data.id!,
            })
          }
        />
      </div>
      <div className="px-2 py-1 bg-white dark:bg-gray-800">
        {data.description}
      </div>
    </div>
  );
};
