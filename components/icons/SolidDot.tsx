import React from "react";

function SolidDot(props: React.SVGAttributes<HTMLOrSVGElement>) {
  return (
    <svg
      viewBox="0 0 20 20"
      height="48"
      width="48"
      focusable="false"
      role="img"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>DotSingle icon</title>
      <path d="M7.8 10a2.2 2.2 0 0 0 4.4 0 2.2 2.2 0 0 0-4.4 0z"></path>
    </svg>
  );
}

export default SolidDot;
