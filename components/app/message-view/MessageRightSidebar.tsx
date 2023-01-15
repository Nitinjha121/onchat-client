import React from "react";

//recoil
import { useRecoilValue } from "recoil";
import { userSidebarProfileToggleAtom } from "./recoil";

function MessageRightSidebar() {
  const userSidebarToggle = useRecoilValue(userSidebarProfileToggleAtom);

  return (
    <aside
      className={`hidden ${
        userSidebarToggle ? "lg:block" : ""
      } basis-64 bg-slate-300 dark:bg-gray-700`}
    >
      <div className="h-32 bg-blue-500 relative">
        <div className="bg-blue-500 z-[5] border-[6px] border-slate-300 dark:border-gray-700 rounded-full w-20 h-20 absolute left-5 -bottom-7"></div>
      </div>

      <section className="p-4 bg-inherit relative w-72">
        <div className="p-3 mt-14 bg-slate-100 dark:bg-gray-800 rounded space-y-4">
          <h2 className="text-lg font-semibold">Nitin</h2>

          <hr className="dark:border-gray-500 border-gray-300" />

          <div>
            <p className="font-medium text-xs uppercase">OnChat Member Since</p>
            <p className="text-sm font-light">Apr 17, 2022</p>
          </div>
        </div>
      </section>
    </aside>
  );
}

export default MessageRightSidebar;
