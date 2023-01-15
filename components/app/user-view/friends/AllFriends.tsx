import React from "react";
//lib
import { ApiRoutes } from "lib/constants";
import { mutate, useAPIFetcher } from "lib/hooks";

//types
import { IDirectMessageCard, IUserCard } from "types";

//components
import {
  Container,
  Dropdown,
  EmptyState,
  type IEmptyStateProps,
} from "components/ui";
import UserCardSkeleton, { UserCardSkeletonShimmer } from "./UserCardSkeleton";

//next link
import Link from "next/link";

//next router
import Router from "next/router";
import { APIPusher, fetcherCacheData } from "lib/services";
import { useGlobalContext } from "components/contexts";

const emptyState: IEmptyStateProps = {
  image: {
    src: "https://ik.imagekit.io/kggne4pv7or/onchat/Empty_State/Team_spirit-amico_p1L2mxRF9.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673700392378",
    className: "top-2",
  },
  heading: "No friends found.",
  description: `You don't have any friends yet. Click the 'Find friends' button to start connecting.`,
  button: {
    text: "Find Friends",
    className: "!py-1",
    onClick() {
      Router.push("/channels/@me?type=find-friends");
    },
  },
};

const AllFriends = () => {
  const { data: allFriendsUser } = useAPIFetcher<IDirectMessageCard[]>(
    ApiRoutes.GET_ALL_USER_FRIENDS
  );

  const { addToaster } = useGlobalContext();

  if (allFriendsUser && allFriendsUser.length == 0)
    return <EmptyState {...emptyState} />;

  const blockFriend = async (user: IUserCard) => {
    try {
      await APIPusher(ApiRoutes.BLOCK_USER(user._id), {});
      mutate(ApiRoutes.GET_ALL_USER_FRIENDS);
      fetcherCacheData.delete(ApiRoutes.GET_ALL_BLOCKED_USERS);
    } catch (err: any) {
      addToaster({
        kind: "warning",
        description: err.data.message || "Something Went wrong.",
      });
    }
  };

  return (
    <Container className="overflow-y-auto h-full space-y-4">
      {!allFriendsUser
        ? Array.from({ length: 14 }, (_, i) => (
            <div key={i} className="user-shimmer-card-view">
              <UserCardSkeletonShimmer />
            </div>
          ))
        : allFriendsUser?.map((user) => (
            <div
              className="user-card-view justify-between items-center"
              key={user.nodeId}
            >
              <Link
                href={`/channels/@me/${user.nodeId}`}
                className="flex flex-1 gap-2 w-0"
              >
                <UserCardSkeleton user={user} />
              </Link>

              <Dropdown buttonClassName="rounded-full !p-1">
                <Dropdown.Item
                  className="text-red-500"
                  onClick={blockFriend.bind(this, user)}
                >
                  Block Friend
                </Dropdown.Item>
              </Dropdown>
            </div>
          ))}
    </Container>
  );
};

export default AllFriends;
