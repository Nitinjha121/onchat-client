import React from "react";

//types
import { UserImage } from "components/app/helper";
import { IUserCard } from "types";

interface IProps {
  user: IUserCard;
}

const UserCardSkeleton = (props: IProps) => {
  const { user } = props;

  return (
    <React.Fragment>
      <UserImage imageUrl={user.imageUrl} name={user.name} />

      <div className="text-sm overflow-hidden">
        <p className="font-bold truncate">{user.username}</p>
        <p className="truncate">{user.name}</p>
      </div>
    </React.Fragment>
  );
};

export default UserCardSkeleton;

export const UserCardSkeletonShimmer = () => {
  return (
    <React.Fragment>
      <div className="circle"></div>

      <div className="flex-1 space-y-2">
        <p className="shimmer-line"></p>
        <p className="shimmer-line"></p>
      </div>
    </React.Fragment>
  );
};
