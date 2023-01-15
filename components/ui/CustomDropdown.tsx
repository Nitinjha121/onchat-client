import React from "react";

//heroicons
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

//headless ui
import { Transition } from "@headlessui/react";

//recoil
import { atom, useRecoilState } from "recoil";

export const customDropdownIdAtom = atom({
  key: "custom_dropdown_id",
  default: "",
});

interface IProps {
  children: React.ReactNode;
  button?: React.ReactNode;
  isButton?: boolean;
  id?: string;
  className?: string;
  buttonClassName?: string;
}

function CustomDropdown(props: IProps) {
  const { children, button, isButton = true, id = "", className = "" } = props;
  const randomId = React.useId();
  const uniqueId = id || randomId;

  const [dropdownId, setDropdownId] = useRecoilState(customDropdownIdAtom);

  const clickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.isPropagationStopped());
    if (dropdownId == uniqueId) setDropdownId("");
    else setDropdownId(uniqueId);
  };

  React.useEffect(() => {
    document.addEventListener("click", () => setDropdownId(""));

    return () => document.removeEventListener("click", () => {});
  }, [setDropdownId]);

  return (
    <div onClick={clickHandler}>
      {isButton &&
        (button || (
          <div
            className={`bg-transparent cursor-pointer ${props.buttonClassName}`}
          >
            <EllipsisVerticalIcon className="w-5 h-5" />
          </div>
        ))}

      <Transition
        as={"div"}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={true}
        className={`absolute right-0 bg-white dark:bg-gray-800 rounded shadow-[rgba(0,0,0,0.02)_0px_1px_3px_0px,rgba(27,31,35,0.15)_0px_0px_0px_1px] ${
          dropdownId == uniqueId ? "" : "invisible"
        } ${className}`}
      >
        {children}
      </Transition>
    </div>
  );
}

export default CustomDropdown;
