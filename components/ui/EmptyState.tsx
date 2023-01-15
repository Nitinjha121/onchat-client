import React from "react";

//components
import Button from "./Button";
import Container from "./Container";

export interface IEmptyStateProps {
  image: {
    className?: string;
    src: string;
  };
  heading: string;
  description?: string;
  button?: {
    text: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
  };
}

function EmptyState(props: IEmptyStateProps) {
  return (
    <Container className="flex flex-col items-center justify-center gap-2 h-full">
      <div className={`inline-block relative ${props.image.className || ""}`}>
        <img
          src={props.image.src}
          style={{
            width: "100%",
            minHeight: 400,
            maxWidth: 500,
          }}
          alt="image"
        />
      </div>

      <h1 className="text-xl">{props.heading}</h1>
      <p className="text-gray-700 dark:text-gray-300 text-center max-w-2xl mx-auto mb-1">
        {props.description}
      </p>

      {props.button && (
        <Button
          className={`flex gap-2 ${props.button.className || ""}`}
          onClick={props.button.onClick}
        >
          <span>{props.button?.icon}</span>

          <span>{props.button?.text}</span>
        </Button>
      )}
    </Container>
  );
}

export default EmptyState;
