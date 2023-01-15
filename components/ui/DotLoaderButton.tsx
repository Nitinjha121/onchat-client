import React from "react";

//components
import Button from "./Button";
import DotPulseLoader from "./DotPulseLoader";

function DotLoaderButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", children, disabled, ...rest } = props;

  return (
    <Button
      className={`relative ${disabled ? "bg-opacity-95" : ""} ${className}`}
      disabled={disabled}
      {...rest}
    >
      {disabled && (
        <DotPulseLoader
          childrenClassName="!bg-white"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      <span className={`${disabled ? "invisible" : ""}`}>{children}</span>
    </Button>
  );
}

export default DotLoaderButton;
