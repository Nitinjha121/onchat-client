import React from "react";

type IProps = {
  imageUrl?: string;
  name?: string;
  className?: string;
  isNameFallback?: true;
};

function UserImage(props: IProps) {
  const { imageUrl, name, className = "", isNameFallback = false } = props;

  return (
    <React.Fragment>
      {!imageUrl && isNameFallback ? (
        <div className="w-10 h-10 cursor-pointer transition-all duration-300 rounded-[100px] hover:rounded-2xl bg-gray-200 text-gray-700 flex items-center justify-center text-xl dark:bg-gray-600 dark:text-white uppercase">
          {name ? name[0] : "U"}
        </div>
      ) : (
        <img
          className={`rounded-full w-10 h-10 ${className}`}
          src={
            imageUrl ||
            "https://edison-tenant.b-cdn.net/Empty-states/default-profile.png"
          }
          alt={name}
        />
      )}
    </React.Fragment>
  );
}

export default UserImage;
