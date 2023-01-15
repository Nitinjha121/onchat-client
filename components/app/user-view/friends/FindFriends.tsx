import React from "react";

//services
import { ApiRoutes } from "lib/constants";
import { APIFetcher, APIPusher } from "lib/services";

//context
import { GlobalContext } from "components/contexts/GlobalContextProvider";

//types
import { IUserCard } from "types";

//components
import UserCardSkeleton, { UserCardSkeletonShimmer } from "./UserCardSkeleton";
import { Container, Model, EmptyState, IEmptyStateProps } from "components/ui";
import IndividualUserModel from "./IndividualUserModel";

//heroicons
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const emptyState: IEmptyStateProps = {
  image: {
    src: "https://ik.imagekit.io/kggne4pv7or/onchat/Empty_State/Search-rafiki_34W-0ZUdZ.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673698860089",
    className: "top-10",
  },
  heading: "No users found",
  description: "Change your search query in order to see the available data.",
};

function AddFriends() {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchUserData, setSearchUserData] = React.useState<
    IUserCard[] | null
  >(null);
  const [isLoading, setIsLoading] = React.useState(false);

  //context
  const { globalDispatch } = React.useContext(GlobalContext);

  const changeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
    if (!value) {
      setSearchUserData(null);
      return;
    }
    setIsLoading(true);

    try {
      const data = await APIFetcher(ApiRoutes.USER_FRIEND_SEARCH(value));
      setSearchUserData(data);
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

    setIsLoading(false);
  };

  console.log("searchUserData", searchUserData);

  return (
    <section className="flex flex-col h-full">
      <Container>
        <div className="px-4 focus-within:shadow-md flex items-center gap-2 dark:focus:shadow-gray-500 w-full dark:bg-gray-700 dark:text-white rounded-lg border border-gray-400 max-w-2xl transition-all duration-150 bg-white">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />

          <input
            placeholder="Search"
            className={`pr-4 py-3 w-full outline-none bg-inherit`}
            value={searchValue}
            onChange={changeHandler}
          />
        </div>
      </Container>

      <Container className="mt-6 overflow-y-auto">
        {searchUserData?.length == 0 ? (
          <EmptyState {...emptyState} />
        ) : (
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
            {isLoading ? (
              <AddFriendsShimmer />
            ) : (
              searchUserData?.map((user) => (
                <UserCardViewWrapper key={user._id} user={user} />
              ))
            )}
          </div>
        )}
      </Container>
    </section>
  );
}

export default AddFriends;

interface IUserCardViewWrapper {
  user: IUserCard;
}
const UserCardViewWrapper = (props: IUserCardViewWrapper) => {
  const { user } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className="user-card-view cursor-pointer" onClick={() => setIsOpen(true)}>
        <UserCardSkeleton user={user} />
      </div>

      <Model
        show={isOpen}
        onClose={() => setIsOpen(false)}
        title={user.username}
      >
        <IndividualUserModel user={user} />
      </Model>
    </React.Fragment>
  );
};

const AddFriendsShimmer = () => {
  return (
    <React.Fragment>
      {Array.from({ length: 24 }, (_, i) => (
        <div className="user-shimmer-card-view" key={i}>
          <UserCardSkeletonShimmer />
        </div>
      ))}
    </React.Fragment>
  );
};
