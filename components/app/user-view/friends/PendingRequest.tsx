import React from "react";

//lib
import { ApiRoutes } from "lib/constants";
import { mutate, useAPIFetcher } from "lib/hooks";

//types
import { IPaginationStructure, IUserCard } from "types";

//custom hooks
import { useGlobalContext } from "components/contexts/GlobalContextProvider";

//components
import { Button, Container, EmptyState, IEmptyStateProps } from "components/ui";
import UserCardSkeleton, { UserCardSkeletonShimmer } from "./UserCardSkeleton";

//lib
import { APIPusher, fetcherCacheData } from "lib/services";

//next router
import { useRouter } from "next/router";

function PendingRequest() {
  const { data: allPendingRequest } = useAPIFetcher<
    IPaginationStructure<IUserCard[]>
  >(ApiRoutes.GET_ALL_PENDING_FRIEND_REQUEST(10, 0));

  const router = useRouter();

  const emptyState: IEmptyStateProps = {
    image: {
      src: "https://ik.imagekit.io/kggne4pv7or/onchat/Empty_State/Empty-amico_dMF8IbRjp.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673698859730",
      className: "top-3",
    },
    heading: "No new request found.",
    description: `No new friend requests at the moment. Find new friends by clicking the 'Find friends' button.`,
    button: {
      text: "Find Friends",
      className: "!py-1",
      onClick() {
        router.push("/channels/@me?type=find-friends");
      },
    },
  };

  if (allPendingRequest && allPendingRequest.results.length === 0)
    return <EmptyState {...emptyState} />;

  return (
    <Container className="overflow-y-auto h-full">
      <section className="grid gap-4 content-baseline xl:grid-cols-2">
        {!allPendingRequest ? (
          <PendingRequestShimmer />
        ) : (
          allPendingRequest?.results.map((user) => (
            <UserCardView key={user._id} user={user} />
          ))
        )}
      </section>
    </Container>
  );
}

export default PendingRequest;

interface IProps {
  user: IUserCard;
}

const UserCardView = (props: IProps) => {
  const { user } = props;

  const { globalDispatch } = useGlobalContext();

  const acceptFriendRequestHandler = async () => {
    try {
      await APIPusher(ApiRoutes.ACCEPT_FRIEND_REQUEST(user._id), {});
      mutate(ApiRoutes.GET_ALL_PENDING_FRIEND_REQUEST(10, 0));

      //rm the friend request cache if present so the next time user visit the pop up they can see the new status
      fetcherCacheData.delete(ApiRoutes.ACCEPT_FRIEND_REQUEST(user._id));
      //rm cache for all friends tab
      fetcherCacheData.delete(ApiRoutes.GET_ALL_USER_FRIENDS);

      globalDispatch({
        type: "ADD_TOAST_ALERT",
        payload: {
          kind: "success",
          heading: "success",
          description: "Friend Request Accepted Successfully.",
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

  return (
    <div className="user-card-view items-center justify-between cursor-default">
      <div className="flex gap-3 flex-1 w-0">
        <UserCardSkeleton user={user} />
      </div>

      <Button
        className="!py-1 whitespace-nowrap"
        onClick={acceptFriendRequestHandler}
      >
        Accept Friend Request
      </Button>
    </div>
  );
};

const PendingRequestShimmer = () => (
  <>
    {Array.from({ length: 14 }, (_, i) => (
      <div
        className="user-shimmer-card-view items-center justify-between !cursor-default"
        key={i}
      >
        <div className="flex gap-3 flex-1 w-0">
          <UserCardSkeletonShimmer />
        </div>

        <div className="shimmer-line !h-4 basis-64"></div>
      </div>
    ))}
  </>
);
