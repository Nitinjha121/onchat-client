import React from "react";

//heroicons
import { AtSymbolIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";

//icons
import { OutlineDot } from "components/icons";

//recoil
import { useRecoilState } from "recoil";
import { userSidebarProfileToggleAtom } from "./recoil";

//components
import { Tooltip } from "components/ui";

//hooks
import { useMediaMatch } from "components/hooks";

function MessageHeaderView() {
  const [userSidebarToggle, setUserSidebarToggle] = useRecoilState(
    userSidebarProfileToggleAtom
  );

  const isLgMatch = useMediaMatch("1024px");

  return (
    <header className="px-4 py-3 shadow z-[5] flex justify-between">
      <p className="text-gray-500 dark:text-gray-300 flex items-center gap-1">
        <AtSymbolIcon className="w-5 h-5" />
        FakeUserName
        <OutlineDot className="w-5 h-5" />
      </p>

      <div className="flex gap-2 mr-16">
        <Tooltip
          title={
            (userSidebarToggle ? "Hide User Profile" : "Show User Profile") +
            (isLgMatch ? "(Unavailable)" : "")
          }
          position="bottom"
          tooltipClassName="!max-w-[150px]"
        >
          <UserCircleIcon
            className={`hover:text-gray-600 dark:hover:text-gray-200 ${
              userSidebarToggle
                ? "dark:text-gray-100 text-gray-700"
                : "text-gray-500 dark:text-gray-300"
            } ${isLgMatch ? "text-gray-400" : ""} w-7 h-7 cursor-pointer`}
            onClick={() =>
              !isLgMatch && setUserSidebarToggle((toggle) => !toggle)
            }
          />
        </Tooltip>
      </div>
    </header>
  );
}

export default MessageHeaderView;
