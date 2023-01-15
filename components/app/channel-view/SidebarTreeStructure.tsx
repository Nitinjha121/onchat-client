import React from "react";

//icons
import { Avatar } from "components/icons";

//next router
import { useRouter } from "next/router";
import Link from "next/link";

//heroicons
import {
  HashtagIcon,
  ChevronDownIcon,
  PlusIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

//components ui
import { Accordion } from "components/ui";

import crypto from "crypto";

interface IProps {
  categoryChannelData: any;
}
const SidebarTreeStructure = ({
  categoryChannelData = tempCategoryChannelData,
  level = 1,
}) => {
  const router = useRouter();
  const spaceId = router.query.spaceId;
  const channelId = router.query.channelId;

  return (
    <section className={`${level == 1 ? "space-y-5" : "space-y-2"}`}>
      {categoryChannelData.map((channelCategory, i) => (
        <React.Fragment key={i}>
          {!("children" in channelCategory) ? (
            <div className="mt-3">
              <NavOptions
                href={`/channels/${spaceId}/${channelCategory.id}`}
                isActive={channelId == channelCategory.id}
              >
                {channelCategory.type == "text" ? (
                  <HashtagIcon className="w-5 h-5" />
                ) : (
                  <LockClosedIcon className="w-4 h-4" />
                )}{" "}
                {channelCategory.name}
              </NavOptions>
            </div>
          ) : (
            <Accordion
              key={i}
              initialValue
              headers={(isOpen) => (
                <div className="flex gap-3 text-sm justify-between cursor-pointer items-center">
                  <div className="flex gap-3 items-center">
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-all ${isOpen ? "" : ""}`}
                    />{" "}
                    {channelCategory.name}
                  </div>

                  <PlusIcon className="w-5 h-5" />
                </div>
              )}
            >
              <SidebarTreeStructure
                categoryChannelData={channelCategory.children}
                level={level + 1}
              />
            </Accordion>
          )}
        </React.Fragment>
      ))}
    </section>
  );
};

export default SidebarTreeStructure;

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

const tempCategoryChannelData = [
  {
    id:
      typeof window != "undefined"
        ? window.crypto.randomUUID()
        : crypto.randomUUID(),
    name: "Top Level",
    type: "text",
  },

  {
    name: "Text Channel",
    children: [
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "Gaming",
        type: "text",
      },
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "Arts",
        type: "text",
      },
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "School",
        type: "text",
      },
    ],
  },
  {
    name: "Demo Channel",
    children: [
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "Teaching",
        type: "text",
      },
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "College",
        type: "text",
      },
    ],
  },
  {
    name: "Voice Channel",
    children: [
      {
        id:
          typeof window != "undefined"
            ? window.crypto.randomUUID()
            : crypto.randomUUID(),
        name: "Wonder Gaming",
        type: "voice",
      },
    ],
  },
];
