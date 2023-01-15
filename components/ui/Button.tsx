import React from "react";

function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  // eslint-disable-next-line react/prop-types
  const { className = "", children, ...rest } = props;

  return (
    <button
      className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-sm text-white ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
