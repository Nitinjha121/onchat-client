import React from "react";

//components
import {
  Container,
  Dropdown,
  EmptyState,
  type IEmptyStateProps,
} from "components/ui";

//hooks
import { mutate, useAPIFetcher } from "lib/hooks";

//constants
import { ApiRoutes } from "lib/constants";

//types
import { IUserCard } from "types";
import UserCardSkeleton, { UserCardSkeletonShimmer } from "./UserCardSkeleton";
import { APIPusher, fetcherCacheData } from "lib/services";
import { useGlobalContext } from "components/contexts";

const emptyState: IEmptyStateProps = {
  image: {
    src: "https://ik.imagekit.io/kggne4pv7or/onchat/Empty_State/Security-cuate_-11YQ_D8c.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673703595129",
    className: "top-10",
  },
  heading: "No Friends Blocked Yet",
  description:
    "You haven't blocked any friends yet. If you ever need to, you can block a user from their profile page.",
};

const BlockedFriends = () => {
  const { data: allBlockedUsers } = useAPIFetcher<IUserCard[]>(
    ApiRoutes.GET_ALL_BLOCKED_USERS
  );

  const { addToaster } = useGlobalContext();

  if (allBlockedUsers?.length == 0) return <EmptyState {...emptyState} />;

  const unBlockFriend = async (user: IUserCard) => {
    try {
      await APIPusher(ApiRoutes.UNBLOCK_USER(user._id), {});
      mutate(ApiRoutes.GET_ALL_BLOCKED_USERS);
      fetcherCacheData.delete(ApiRoutes.GET_ALL_USER_FRIENDS);
    } catch (err: any) {
      addToaster({
        kind: "warning",
        description: err?.data?.message || "Something Went wrong.",
      });
    }
  };

  return (
    <Container className="overflow-y-auto h-full space-y-4">
      {!allBlockedUsers ? (
        <>
          {Array.from({ length: 16 }, (_, i) => (
            <div className="user-shimmer-card-view" key={i}>
              <UserCardSkeletonShimmer />
            </div>
          ))}
        </>
      ) : (
        allBlockedUsers?.map((user) => (
          <div
            className="user-card-view justify-between items-center"
            key={user._id}
          >
            <div className="flex gap-3 flex-1 w-0">
              <UserCardSkeleton user={user} />
            </div>

            <Dropdown buttonClassName="rounded-full !p-1">
              <Dropdown.Item
                className="text-red-500"
                onClick={unBlockFriend.bind(this, user)}
              >
                UnBlock Friend
              </Dropdown.Item>
            </Dropdown>
          </div>
        ))
      )}
    </Container>
  );
};

export default BlockedFriends;
