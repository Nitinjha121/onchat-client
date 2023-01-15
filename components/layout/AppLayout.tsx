import React from "react";

//components
import { SpaceSidebar, ChannelSidebar, UserSidebar } from "components/app";

//next router
import { useRouter } from "next/router";

interface IProps {
  children: React.ReactNode;
}

function AppLayout(props: IProps) {
  const router = useRouter();

  const isUserView = router.pathname.includes("@me");

  return (
    <main className="flex h-screen overflow-hidden dark:text-white ">
      <SpaceSidebar />
      {isUserView ? <UserSidebar /> : <ChannelSidebar />}

      <div className="bg-slate-200 dark:bg-gray-600 flex-1 h-full">
        {React.Children.only(props.children)}
      </div>
    </main>
  );
}

export default AppLayout;
