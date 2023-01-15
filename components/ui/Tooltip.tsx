import React from "react";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  tooltipClassName?: string;
  tailClassName?: string;
  position?: ITooltipPosition;
}

type ITooltipPosition = "top" | "left" | "right" | "bottom";

const currentTailClassName = `absolute transition-transform border-x-[6px] border-x-transparent border-solid border-t-[6px] border-b-0 border-t-gray-800`;

const currentTooltipClassName = `text-center bg-gray-800 text-white px-2 py-1 text-xs rounded transition-transform`;

const currentTailPosition: Record<ITooltipPosition, string> = {
  top: `${currentTailClassName} -bottom-1 left-1/2 -translate-x-1/2 [transform-origin:bottom_center]`,
  bottom: `${currentTailClassName} top-0 rotate-180 left-1/2 -translate-x-1/2 [transform-origin:top_center]`,
  left: `${currentTailClassName} -right-[2px] rotate-[270deg] bottom-1/2 -translate-y-1/2 [transform-origin:right_center]`,
  right: `${currentTailClassName} -left-[2px] rotate-90 bottom-1/2 -translate-y-1/2 [transform-origin:left_center]`,
};

const currentTooltipPosition: Record<ITooltipPosition, string> = {
  top: `${currentTooltipClassName} w-max max-w-full left-1/2 -translate-x-1/2 -translate-y-full [transform-origin:bottom_center]`,
  bottom: `${currentTooltipClassName} w-max max-w-full left-1/2 -translate-x-1/2 [transform-origin:top_center]`,
  left: `${currentTooltipClassName} w-max top-1/2 right-0 -translate-y-1/2 [transform-origin:right_center]`,
  right: `${currentTooltipClassName} w-max top-1/2 left-0 -translate-y-1/2 [transform-origin:left_center]`,
};

const absoluteParentPosition: Record<ITooltipPosition, string> = {
  top: `-top-1 -translate-y-full`,
  bottom: "-bottom-1 translate-y-full",
  left: "-left-1 -translate-x-full top-1/2 -translate-y-1/2",
  right: "-right-1 translate-x-full top-1/2 -translate-y-1/2",
};

function Tooltip(props: IProps) {
  const {
    className = "",
    tooltipClassName = "",
    tailClassName = "",
    position = "top",
    ...restProps
  } = props;

  return (
    <div className={`relative group ${className}`} {...restProps}>
      <div
        className={`absolute z-30 w-full ${absoluteParentPosition[position]}`}
      >
        <div
          className={`fixed scale-0 group-hover:scale-100 ${currentTooltipPosition[position]} ${tooltipClassName}`}
        >
          <div>{props.title}</div>
          <div
            className={`scale-0 group-hover:scale-100 ${currentTailPosition[position]} ${tailClassName}`}
          ></div>
        </div>
      </div>
      {props.children}
    </div>
  );
}

export default Tooltip;
