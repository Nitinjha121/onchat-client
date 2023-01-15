import React from "react";

//hooks
import { useInView } from "components/hooks";

interface ICommonProps {
  loadMore: (times: number) => void;
  loader: React.ReactNode;
  children: React.ReactNode;
  hasMore: boolean;
  endMessage?: React.ReactNode;
}

interface ITopScrollType extends ICommonProps {
  scrollType?: "top";
  scrollableEle?: HTMLElement | null;
}
interface IBottomScrollType extends ICommonProps {
  scrollType?: "bottom";
  scrollableEle?: never;
}

type IProps = ITopScrollType | IBottomScrollType;

function InfiniteScroll(props: IProps) {
  const {
    scrollType = "bottom",
    loadMore,
    scrollableEle = document.body,
  } = props;

  //hooks
  const { inView, ref } = useInView({ threshold: 0 });

  //ref
  const isNextRunRef = React.useRef(0);
  const loaderRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (inView && loaderRef.current) {
      loadMore(++isNextRunRef.current);
      if (scrollType === "top") {
        scrollableEle?.scroll({
          behavior: "smooth",
          top: loaderRef.current.scrollHeight + 200,
        });
      }
    } else {
      isNextRunRef.current = 0;
    }

    () => {
      isNextRunRef.current = 0;
    };
  }, [inView, scrollableEle, scrollType, ref, loadMore]);

  function setRef(node: HTMLDivElement | null) {
    loaderRef.current = node;
    ref.current = node;
  }

  return (
    <div>
      {scrollType === "top" &&
        (props.hasMore ? (
          <div ref={setRef} id="top-scroll">
            {props.loader}
          </div>
        ) : (
          props.endMessage
        ))}

      {props.children}

      {scrollType === "bottom" &&
        (props.hasMore ? (
          <div ref={setRef}>{props.loader}</div>
        ) : (
          props.endMessage
        ))}
    </div>
  );
}

export default InfiniteScroll;
