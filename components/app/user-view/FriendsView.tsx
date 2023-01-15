import React, { Suspense } from "react";

//icons
import { Avatar } from "components/icons";

//navigation components
import {
  FindFriends,
  AllFriends,
  BlockedFriends,
  FriendsOnline,
  PendingRequest,
} from "./friends";

//headless ui
import { Tab } from "@headlessui/react";

//components
import { Container } from "components/ui";

//next router
import { useRouter } from "next/router";

const friendsHeaderNavigationData = {
  online: <FriendsOnline />,
  all: <AllFriends />,
  pending: <PendingRequest />,
  blocked: <BlockedFriends />,
  "find-friends": <FindFriends />,
};

const friendNavigationKey = Object.keys(friendsHeaderNavigationData);
const friendNavigationValue = Object.values(friendsHeaderNavigationData);

function FriendsHeader() {
  const router = useRouter();
  const type = router.query.type;

  const queryHandler = (type: string) => {
    router.push(window.location.pathname + "?type=" + type);
  };
  return (
    <Tab.Group
      as={"section"}
      selectedIndex={
        !type ? 0 : friendNavigationKey.findIndex((key) => key === type)
      }
      className="flex flex-col gap-1 flex-1 h-full"
    >
      <Tab.List className="flex gap-2 items-center shadow dark:text-white px-4 py-3">
        <div className="flex gap-3 items-center pr-3 font-semibold">
          <Avatar className="w-7 h-7" /> Friends
        </div>

        {friendNavigationKey.map((navName) => (
          <Tab
            key={navName}
            value={type}
            onClickCapture={() => queryHandler(navName)}
            className={({ selected }) =>
              `px-5 rounded-md py-1 outline-none border-0 capitalize text-sm font-medium transition-all duration-200 ${
                selected
                  ? "bg-blue-500 text-white shadow"
                  : "bg-gray-200 text-gray-700 hover:!bg-blue-400 hover:text-white dark:bg-gray-500 dark:text-white"
              }`
            }
          >
            {navName.replaceAll("-", " ")}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={"flex-1 h-0 py-4"}>
        {({ selectedIndex }) => (
          <>
            {friendNavigationValue.map((tabData, idx) => (
              <Tab.Panel
                key={idx}
                className={`rounded-xl pb-3 pt-5 outline-none h-full overflow-y-auto`}
              >
                <Suspense >{tabData}</Suspense>
              </Tab.Panel>
            ))}
          </>
        )}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default FriendsHeader;
