import React from "react";

//next link
import Link from "next/link";

//next router
import { useRouter } from "next/router";

function SpaceSidebar() {
  const router = useRouter();
  const spaceId = Number(router.query.spaceId);
  const channelId = Number(router.query.channelId);

  return (
    <div className="p-3 space-y-3 h-full basis-18 dark:bg-gray-800">
      <SpaceShape href="/channels/@me" isActive={Number.isNaN(spaceId)}>
        N
      </SpaceShape>

      <div className="h-0.5 bg-gray-200 rounded"></div>

      <div className="space-y-4">
        {tempSpaceData.map((key, i) => (
          <SpaceShape href={`/channels/${i}/1`} key={i} isActive={spaceId == i}>
            {key}
          </SpaceShape>
        ))}
      </div>
    </div>
  );
}

export default SpaceSidebar;

const tempSpaceData = ["P", "L", "S", "K", "J"];

interface ISpaceShapeProps {
  isActive: boolean;
  href: string;
  children: React.ReactNode;
}
const SpaceShape = (props: ISpaceShapeProps) => (
  <Link
    href={props.href}
    className={`w-12 h-12 cursor-pointer transition-all duration-300 hover:rounded-2xl flex items-center justify-center text-2xl ${
      props.isActive
        ? "rounded-2xl bg-blue-500 text-gray-100"
        : "rounded-[25px] bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-white hover:!bg-blue-400 hover:text-white"
    }`}
  >
    {props.children}
  </Link>
);
