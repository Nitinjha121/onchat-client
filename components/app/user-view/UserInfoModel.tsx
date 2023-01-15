import React from "react";

//recoil
import { currentUserDataAtom } from "components/recoil";
import { useRecoilValue } from "recoil";

//lib
import { logout } from "lib/cookie";

function UserInfoModel() {
  const currentUser = useRecoilValue(currentUserDataAtom);

  const joinDate = React.useMemo(
    () => currentUser && new Date(currentUser.createdAt),
    []
  );

  return (
    <section className="rounded overflow-hidden bg-slate-100 dark:bg-gray-800 relative w-72 shadow-elevation-high">
      <div className="h-14 bg-blue-500"></div>

      <div className="bg-blue-500 border-[6px] border-slate-100 dark:border-gray-800 rounded-full w-16 h-16 absolute left-5 top-7"></div>

      <div className="p-3 m-4 mt-14 bg-white dark:bg-black rounded space-y-4">
        <h2 className="text-lg font-semibold">{currentUser?.username}</h2>

        <hr className="bg-gray-800" />

        <div>
          <p className="font-medium text-xs uppercase">OnChat Member Since</p>
          <p className="text-sm font-light">
            {joinDate?.toLocaleDateString("en-us", {
              month: "short",
              year: "numeric",
              day: "2-digit",
            })}
          </p>
        </div>

        <hr />

        <div>
          <p className="flex gap-2 items-center text-sm font-light">
            <span className="rounded-full w-3 h-3 bg-green-500"></span> Online
          </p>

          <p className="cursor-pointer" onClick={logout}>
            LogOut
          </p>
        </div>
      </div>
    </section>
  );
}

export default UserInfoModel;
