import React from "react";

function OutlineDot(props: React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Dot icon</title>
      <path
        fillRule="evenodd"
        d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
      ></path>
    </svg>
  );
}

export default OutlineDot;
