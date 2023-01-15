import React from "react";

//components
import { EmptyState, type IEmptyStateProps } from "components/ui";

const emptyState: IEmptyStateProps = {
  image: {
    src: "https://ik.imagekit.io/kggne4pv7or/onchat/Empty_State/Alone-amico_Vw4YO4542Z.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1673701201404",
  },
  heading: "No Friends Online",
  description:
    "No friends online at the moment. Check back later or message your friends to see if they're available.",
};

function FriendsOnline() {
  return (
    <div className="h-full">
      <EmptyState {...emptyState} />
    </div>
  );
}

export default FriendsOnline;
