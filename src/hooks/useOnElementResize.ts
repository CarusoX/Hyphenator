import React, { useEffect, useRef } from 'react';

// Custom hook to track dimension of a component
// Taken and modified from https://stackoverflow.com/a/60218754
export const useOnElementResize = <T extends HTMLElement>(
  targetRef: React.RefObject<T>,
  callback: ResizeObserverCallback,
): void => {
  const observer = useRef<ResizeObserver>();

  useEffect(() => {
    observer.current = new ResizeObserver(callback);
    observer.current.observe(targetRef.current as Element);

    return () => {
      observer.current?.disconnect();
    };
  }, [targetRef]);
};
