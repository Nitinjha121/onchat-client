import React from "react";

function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  //refs
  const ref = React.useRef<T | null>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  //states
  const [inView, setInView] = React.useState(false);

  const callback: IntersectionObserverCallback = (entries) => {
    const [entry] = entries;
    setInView(entry.isIntersecting);
  };

  React.useEffect(() => {
    const ele = ref.current;
    if (!observerRef.current)
      observerRef.current = new IntersectionObserver(callback, options);
    if (ele) observerRef.current?.observe(ele);

    return () => {
      if (ele) observerRef.current?.unobserve(ele);
    };
  }, [options]);

  return { ref, inView };
}

export default useInView;
