import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Container(props: IProps) {
  const { children, className = "", ...restAttributes } = props;
  return (
    <div
      className={`container mx-auto px-4 lg:px-10 3xl:w-[1564px] ${className}`}
      {...restAttributes}
    >
      {children}
    </div>
  );
}

export default Container;
