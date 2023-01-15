import React from "react";

function JellyButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", children, ...rest } = props;
  return (
    <button
      className={`rounded-3xl px-6 py-2.5 ease-[cubic-bezier(0.5,_2.5,_0.7,_0.7)] duration-300 shadow-[0_0_0_0.065em_black] dark:shadow-[0_0_0_0.065em_white] active:-translate-y-[0.2em] active:shadow-[0_0_0_0.065em_black,0_0.25em_0_0_black] dark:active:shadow-[0_0_0_0.065em_white,0_0.25em_0_0_white] hover:-translate-y-[0.375em] hover:shadow-[0_0_0_0.065em_black,0_0.375em_0_0_black] dark:hover:shadow-[0_0_0_0.065em_white,0_0.375em_0_0_white] text-sm ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default JellyButton;
