import React from "react";

//headlessui
import { Dialog, Transition } from "@headlessui/react";

//heroicons
import { XMarkIcon } from "@heroicons/react/24/outline";

interface IProps {
  title: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  show: boolean;
}

function Model(props: IProps) {
  const { children, onClose, show, title } = props;

  return (
    <Transition appear show={show} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded bg-white dark:bg-slate-800 dark:text-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-center">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6"
                  >
                    {title}
                  </Dialog.Title>
                  <div
                    className="rounded cursor-pointer flex items-center text-gray-600 dark:text-gray-300 hover:text-black hover:bg-gray-300 dark:hover:bg-gray-700"
                    onClick={onClose}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </div>
                </div>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Model;
