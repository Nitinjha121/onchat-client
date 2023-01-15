import React from "react";

import SidebarTreeStructure from "./SidebarTreeStructure";

function ChannelSidebar() {
  return (
    <div className="bg-slate-50 px-2 py-4 basis-56 space-y-6 dark:bg-gray-700 dark:text-white">
      <SidebarTreeStructure />
    </div>
  );
}

export default ChannelSidebar;
