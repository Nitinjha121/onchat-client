import React from "react";

//icons
import { Avatar } from "components/icons";

//next router
import { useRouter } from "next/router";

//next link
import Link from "next/link";

//components
import UserInfoBar from "./UserInfoBar";

//lib
import { ApiRoutes } from "lib/constants";
import { useAPIFetcher } from "lib/hooks";

//types
import { IDirectMessageCard } from "types";
import { UserImage } from "../helper";

//recoil
import { selectedDMUserDataAtom } from "components/recoil";
import { useSetRecoilState } from "recoil";

function UserSidebar() {
  const router = useRouter();
  const directMessageId = router.query.userId as string;

  const setSelectedDMUser = useSetRecoilState(selectedDMUserDataAtom);

  const { data: mostRecentDMUsers } = useAPIFetcher<IDirectMessageCard[]>(
    ApiRoutes.GET_USER_MOST_RECENT_DM
  );

  React.useEffect(() => {
    if (!Number.isNaN(directMessageId) && mostRecentDMUsers) {
      setSelectedDMUser(
        mostRecentDMUsers.find((user) => user.nodeId == directMessageId) || null
      );
    }
  }, [mostRecentDMUsers, directMessageId]);

  return (
    <section className="bg-slate-50 basis-56 dark:bg-gray-700 dark:text-white flex flex-col justify-between">
      <div className="flex-1 space-y-4 px-2 py-4 overflow-y-auto">
        <NavOptions href={"/channels/@me"} isActive={!directMessageId}>
          <Avatar className="w-7 h-7" /> Friends
        </NavOptions>
        <div className="space-y-3">
          <h1 className="text-sm">Direct Message</h1>

          <section className="space-y-3">
            {mostRecentDMUsers?.map((chat, i) => (
              <NavOptions
                href={`/channels/@me/${chat.nodeId}`}
                key={i}
                isActive={chat.nodeId == directMessageId}
              >
                <UserImage
                  imageUrl={chat.imageUrl}
                  name={chat.username}
                  isNameFallback
                />

                <p className="text-[15px]">{chat.username}</p>
              </NavOptions>
            ))}
          </section>
        </div>
      </div>

      <UserInfoBar />
    </section>
  );
}

export default UserSidebar;

interface INavOptionsProps {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}

const NavOptions = (props: INavOptionsProps) => (
  <Link
    href={props.href}
    className={`flex gap-3 items-center cursor-pointer rounded-lg py-1 px-3 ${
      props.isActive
        ? "bg-blue-500 text-white"
        : "hover:text-white hover:bg-blue-400"
    }`}
  >
    {props.children}
  </Link>
);
