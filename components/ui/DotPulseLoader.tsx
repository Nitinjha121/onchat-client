import React from "react";

interface IProps {
  className?: string;
  childrenClassName?: string;
}

function DotPulseLoader(props: IProps) {
  return (
    <div className={`flex animate-dot-pulse ${props.className || ""}`}>
      <div className={props.childrenClassName}></div>
      <div className={props.childrenClassName}></div>
      <div className={props.childrenClassName}></div>
    </div>
  );
}

export default DotPulseLoader;
