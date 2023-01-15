import React from "react";

interface IProps {
  headers: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  children: React.ReactNode;
  initialValue?: boolean;
  className?: string | ((isOpen: boolean) => string);
}

function Accordion(props: IProps) {
  const { headers, children, initialValue, className = "" } = props;

  const [isOpen, setIsOpen] = React.useState(!!initialValue);
  const collapseRef = React.useRef<HTMLDivElement | null>(null);
  const collapseParentRef = React.useRef<HTMLDivElement | null>(null);

  function clickHandler() {
    updateHeight(!isOpen);
    setIsOpen((isOpen) => !isOpen);
  }

  const updateHeight = (isOpen: boolean) => {
    collapseParentRef.current!.style.overflow = "hidden";

    if (!isOpen) {
      //while closing
      collapseParentRef.current!.style.height = `0px`;
    } else {
      collapseParentRef.current!.style.height = `${
        collapseRef.current!.clientHeight
      }px`;
    }
  };

  React.useEffect(() => {
    if (initialValue) {
      updateHeight(true);
      collapseParentRef.current?.style.removeProperty("overflow");
    }
  }, []);

  const transitionEndHandler = (e: React.TransitionEvent) => {
    //this will only run if there is any height related transition has happened
    if (e.propertyName == "height" && isOpen) {
      if (e.target == collapseParentRef.current)
        collapseParentRef.current!.style.removeProperty("overflow");
    }
  };

  return (
    <section
      className={
        typeof className === "function" ? className(isOpen) : className
      }
    >
      <div className="cursor-pointer" onClick={clickHandler}>
        {typeof headers === "function" ? headers(isOpen) : headers}
      </div>

      <div
        className="relative transition-all duration-300"
        // onClick={() => updateHeight(isOpen)}
        onTransitionEnd={transitionEndHandler}
        ref={collapseParentRef}
      >
        <div ref={collapseRef}> {children}</div>
      </div>
    </section>
  );
}

export default Accordion;
