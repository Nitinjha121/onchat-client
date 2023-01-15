import React from "react";

//heroicons
import {
  ArrowRightIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

//context
import { GlobalContext } from "components/contexts/GlobalContextProvider";

//components
import { Button } from "components/ui";

//services
import { ApiRoutes } from "lib/constants";
import { mutate, useAPIFetcher } from "lib/hooks";
import { APIPusher, fetcherCacheData } from "lib/services";

//recoil
import { useRecoilValue } from "recoil";
import { currentUserDataAtom } from "components/recoil";

//types
import { IHaveFriendRequest, IUserCard } from "types";
import { UserImage } from "components/app/helper";

interface IndividualUserModelProps {
  user: IUserCard;
}

const IndividualUserModel = (props: IndividualUserModelProps) => {
  const { user } = props;

  const { globalDispatch } = React.useContext(GlobalContext);

  const currentUser = useRecoilValue(currentUserDataAtom);
  const isNotCurrentUser = user._id != currentUser?._id;

  const { data } = useAPIFetcher<IHaveFriendRequest>(
    isNotCurrentUser ? ApiRoutes.HAVE_FRIEND_REQUEST(user._id) : null
  );

  const requestHandlerHelper = async (
    Route: (userId: string) => string,
    successMessage: string
  ) => {
    try {
      await APIPusher(Route(user._id), {});
      mutate(ApiRoutes.HAVE_FRIEND_REQUEST(user._id));

      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: {
          kind: "success",
          heading: "success",
          description: successMessage,
        },
      });
    } catch (err: any) {
      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: {
          kind: "warning",
          heading: "warning",
          description: err?.data?.message || "Something went wrong.",
        },
      });
    }
  };

  const sendFriendRequestHandler = async () =>
    await requestHandlerHelper(
      ApiRoutes.SENT_FRIEND_REQUEST,
      "Sent Friend Request Successfully."
    );

  const cancelFriendRequest = async () =>
    await requestHandlerHelper(
      ApiRoutes.CANCEL_FRIEND_REQUEST,
      "Canceled Friend Request Successfully."
    );

  const acceptFriendRequest = async () => {
    try {
      await requestHandlerHelper(
        ApiRoutes.ACCEPT_FRIEND_REQUEST,
        "Friend Request Accepted Successfully."
      );
      fetcherCacheData.delete(ApiRoutes.GET_ALL_USER_FRIENDS);
    } catch (err) {}
  };

  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <UserImage
        className="w-20 h-20"
        imageUrl={user.imageUrl}
        name={user.name}
      />

      <div className="text-center">
        <p className="font-medium text-xl">{user.username}</p>
        <p className="">{user.name}</p>
      </div>

      {data?.areFriends && (
        <div className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-500">
          Friends
        </div>
      )}

      {isNotCurrentUser &&
        data &&
        !data.areFriends &&
        (data?.haveRequest ? (
          <div className="flex gap-3">
            <Button
              onClick={cancelFriendRequest}
              className="flex gap-2 items-center bg-red-500 hover:bg-red-600"
            >
              <XMarkIcon className="w-5 h-5" />
              Cancel Friend Request
            </Button>

            {data.pendingRequest && (
              <Button
                onClick={acceptFriendRequest}
                className="flex gap-2 items-center bg-blue-500 hover:bg-blue-600"
              >
                <CheckIcon className="w-5 h-5" />
                Accept Friend Request
              </Button>
            )}
          </div>
        ) : (
          <Button
            onClick={sendFriendRequestHandler}
            className="flex gap-2 items-center bg-green-500 hover:bg-green-600"
          >
            Send Friend Request
            <ArrowRightIcon className="w-5 h-5" />
          </Button>
        ))}
    </div>
  );
};

export default IndividualUserModel;

const IndividualUserModelShimmer = () => {
  return (
    <div className="mt-2 flex flex-col items-center gap-4">
      <div className="rounded-full w-20 h-20 bg" />
      <div className="">
        <p className="h-2"></p>
        <p className="h-2"></p>
      </div>

      <div className="flex gap-3">
        <div className="flex gap-2 items-center bg-red-500 hover:bg-red-600"></div>

        <div className="flex gap-2 items-center bg-green-500 hover:bg-green-600"></div>
      </div>
    </div>
  );
};
