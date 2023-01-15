import React from "react";

//
import { Menu, Transition } from "@headlessui/react";

//heroicons
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface IProps {
  button?: React.ReactNode;
  children: React.ReactNode;
  buttonClassName: string;
}

function Dropdown(props: IProps) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button
        className={`inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-700 ${
          props.buttonClassName || ""
        }`}
      >
        {props.button || (
          <EllipsisVerticalIcon
            className="h-5 w-5 dark:text-gray-400"
            aria-hidden="true"
          />
        )}
      </Menu.Button>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute overflow-hidden z-[1] right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 dark:divide-gray-800 rounded-md bg-white dark:bg-gray-700 shadow-lg">
          {props.children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

const DropdownItem = (props: React.HTMLAttributes<HTMLDivElement>) => {
  // eslint-disable-next-line react/prop-types
  const { children, className = "", ...rest } = props;

  return (
    <Menu.Item
      as={"div"}
      className={`p-2 cursor-pointer hover:bg-gray-200 bg-inherit dark:hover:bg-gray-800 ${className}`}
      {...rest}
    >
      {children}
    </Menu.Item>
  );
};

export default Object.assign(Dropdown, {
  Item: DropdownItem,
});
